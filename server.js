const https = require('https');
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');

const app = express();
const hostname = 'se.world';
const port = 3000;

var preloaderData = require('./preloader');

class Preloader {
    online = false;

    update() {
        this.post('se.madfrenzy.com', 'seworld.products_expected', pendingProduct => {
            var preloader;

            if (pendingProduct[0] == undefined) {
                preloader = undefined;
                fs.writeFileSync('preloader.js', `var preloaderData = undefined; try { module.exports.preloaderData = preloaderData; } catch {}`);
                this.online = false;
            } else {
                if (Object.keys(pendingProduct[0].preloader_main_pair).length) {
                    pendingProduct.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                    let preloaderImages = [pendingProduct[0].preloader_main_pair.detailed.image_path];

                    Object.keys(pendingProduct[0].preloader_image_pairs).forEach((key) => {
                        preloaderImages.push(pendingProduct[0].preloader_image_pairs[key].detailed.image_path);
                    })

                    preloader = JSON.stringify({
                        name: pendingProduct[0].name,
                        date: pendingProduct[0].date,
                        images: preloaderImages
                    });

                    fs.writeFileSync('preloader.js', `var preloaderData = ${preloader}; try { module.exports.preloaderData = preloaderData; } catch {}`);
                    
                    console.log((new Date()), `Preloader update. Product id: ${pendingProduct[0].id}.`);
                    this.online = true;
                }
            }
        });
    }

    intervalUpdate(interval) {
        this.update();
        setInterval(() => {
            this.update();
        }, interval);
    }


    post(hostname, dispatch, callback) {
        const data = {};

        const options = {
            hostname: hostname,
            path: '/?dispatch=' + dispatch + '&store_access_key=csse&no_redirect',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options).on('response', function(response) {
            var data = '';
            response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    callback(JSON.parse(data));
                });
            }).end();

        req.on('error', error => {
            console.error(error)
        });

        req.end();
    }
}

class Cookie {
    confirm(req, res, accessKey) {
        let originalUrlDecode = (querystring.decode(req.originalUrl.replace('?', '').replace('/', '')));

        if (originalUrlDecode.key)
            res.cookie('key', originalUrlDecode.key);

        if (req.cookies.key == accessKey || originalUrlDecode.key == accessKey)
            return true;

        return false;
    }
}

let preloader = new Preloader();
preloader.intervalUpdate(30000);

let cookie = new Cookie(),
    routes = [
        {
            url: '',
            file: 'index.hbs',
            index: true,
        },
        {
            url: 'product',
            file: 'product.html'
        },
        {
            url: 'checkout',
            file: 'checkout.html'
        },
        {
            url: 'policy',
            file: 'policy.html'
        }
    ];

app.use(cookieParser());
app.use(express.static('public'));

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: '/',
        defaultLayout: false,
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/');

routes.forEach((rout) => {
    app.get('/' + rout.url, (req, res) => {
        if (cookie.confirm(req, res, 'csse')) {
            if (rout.index) {
                res.render(rout.file, {
                    timestamp: Date.now(),
                    hide: preloader.online ? '' : 'display_none'
                });
            } else
                res.sendFile(path.join(__dirname + '/' + rout.file));
        } else
            res.sendFile(path.join(__dirname + '/closed.html'));
    });
});

app.listen(port, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});