const https = require('https');
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');

const app = express();

const webp = require('webp-converter');

var preloaderData = require('./preloader');
var serverConfig = require('./server-config.js');

class Preloader {
    online = false;

    update(callback = undefined) {
        post(serverConfig.config.postHost, 'seworld.products_expected', pendingProduct => {
            var preloader;

            if (pendingProduct[0] == undefined) {
                preloader = undefined;
                fs.writeFileSync('preloader.js', `var preloaderData = undefined; try { module.exports.preloaderData = preloaderData; } catch {}`);
                this.online = false;
                this.product = false;
            } else {
                if (Object.keys(pendingProduct[0]).length) {
                    pendingProduct.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                    let preloaderImages = [];

                    if (Object.keys(pendingProduct[0].preloader_main_pair).length)
                        preloaderImages = [pendingProduct[0].preloader_main_pair.detailed.image_path];

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
                    this.online = pendingProduct[0].show_preloader;

                    // const result = webp.cwebp(image, path.join(__dirname, 'images/' + name.split('.')[0] + '.webp'), "-q 10", logging="-v");

                    let prelaoderImages = [];

                    for (let key of Object.keys(pendingProduct[0].preloader_image_pairs)) {
                        if (pendingProduct[0].preloader_image_pairs[key].absolute_path) {
                            let name = pendingProduct[0].preloader_image_pairs[key].absolute_path.split('/');
                            name = name[name.length - 1];

                            const result = webp.cwebp(pendingProduct[0].preloader_image_pairs[key].absolute_path, path.join(__dirname, 'images/' + name.split('.')[0] + '.webp'), "-q 10", logging="-v");
                            result.then((response) => {
                                console.log(name.split('.')[0] + '.webp');
                            });
                        }
                    }
                }

                this.product = true;
            }

            if (callback)
                callback();
        });
    }

    intervalUpdate(interval) {
        this.update();
        setInterval(() => {
            this.update();
        }, interval);
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

function post(hostname, dispatch, callback) {
    const data = {};

    const options = {
        hostname: hostname,
        path: '/?dispatch=' + dispatch,
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

let preloader = new Preloader();
preloader.intervalUpdate(30000);

let cookie = new Cookie(),
    routes = [],
    images = [];

function updateRoutes(callback) {
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
        },
        {
            url: 'update_cache',
            file: ''
        }
    ];

    post(serverConfig.config.postHost, 'seworld.products_in_stock', result => {
        Object.keys(result).forEach(product_key => {
            let product = result[product_key];

            routes.push({
                url: product.seo_name,
                file: 'product.html'
            })

            try {
                Object.keys(product.pairs.pairs).forEach(key => {
                    if (product.pairs.pairs[key]['1600'])
                        images.push(product.pairs.pairs[key]['1600'].absolute_path);
                })

                images.push(product.pairs.main_pair['1600'].absolute_path);
            } catch {}
        })
    
        post(serverConfig.config.postHost, 'seworld.products_out_of_stock', result => {
            Object.keys(result).forEach(product_key => {
                let product = result[product_key];

                routes.push({
                    url: product.seo_name,
                    file: 'product.html'
                })

                try {
                    Object.keys(product.pairs.pairs).forEach(key => {
                        if (product.pairs.pairs[key]['1600'])
                            images.push(product.pairs.pairs[key]['1600'].absolute_path);
                    })
                    
                    images.push(product.pairs.main_pair['1600'].absolute_path);
                } catch {}
            })
            callback();
        })
    })
}

app.use(cookieParser());
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.engine(
    'hbs',
    expressHbs({
        extname:'hbs',
        layoutsDir: path.join(__dirname, 'views'),
        defaultLayout: false,
        helpers: __dirname,
        partialsDir: [
            __dirname
        ]
    })
);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/');
app.set('views', path.join(__dirname, 'views'));

webp.grant_permission();

setRoutes();

function setRoutes() {
    preloader.update();

    updateRoutes(() => {
        images.forEach(image => {
            let name = image.split('/');
            name = name[name.length - 1];
    
            const result = webp.cwebp(image, path.join(__dirname, 'images/' + name.split('.')[0] + '.webp'), "-q 10", logging="-v");
            result.then((response) => {
                console.log(name.split('.')[0] + '.webp');
            });
        })

        routes.forEach((rout) => {
            app.get('/' + rout.url, (req, res) => {
                // if (cookie.confirm(req, res, 'csse')) {
                    if (rout.index) {
                        res.render(rout.file, {
                            timestamp: Date.now(),
                            preloader_hide: preloader.online ? '' : 'display_none',
                            product_hide: preloader.product ? '' : 'display_none',
                        });
                    } else {
                        if (rout.url == 'update_cache')
                            setRoutes();
                        else
                            res.sendFile(path.join(__dirname + '/' + rout.file));
                    }
                // } else
                //     res.sendFile(path.join(__dirname + '/closed.html'));
            });
        });
    });
}

app.listen(serverConfig.config.port, () => {
    console.log(`Server running at https://${serverConfig.config.hostname}:${serverConfig.config.port}/`);
});