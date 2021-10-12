const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const { stringify } = require('querystring');
const url = require('url');
const preloaderModule = require('./preloader');

server();

const products_expected = post('se.madfrenzy.com', 'seworld.products_expected', data => {
    downloadJSON(JSON.stringify(data[0]));

    if (data != undefined)
        downloadIMG(data[0].pairs.main_pair);
});

products_expected;

setInterval(() => {
    products_expected;
    console.log((new Date()), 'Preloader update');
}, 600000);

function server() {
    const hostname = '127.0.0.1';
    const port = 3000;
    const accessKey = 'csse';

    const server = http.createServer((require, response) => {
        var filePath = '.' + require.url.split('?')[0];

        let queryObject =
            url.parse(require.url,true).query;

        let additionalHeaders = {};
        let cookies = parseCookies(require);

        let haveKey =
            queryObject.key && queryObject.key === accessKey;

        if (haveKey || cookies.key === accessKey) {

            if (!cookies.key) {
                additionalHeaders = {
                    'Set-Cookie': 'key=csse',
                    'Domain': hostname,
                    'Path': '/'
                };
            }

            if (filePath == './') {
                if (preloaderModule.prealoderData == undefined)
                    filePath = './index.html';
                else
                    filePath = './index_preloader.html';
            }

            if (filePath == './product')
                filePath = './product.html';

            if (filePath == './checkout')
                filePath = './checkout.html';

            if (filePath == './policy')
                filePath = './policy.html';

        } else {

            filePath = './closed.html';

        }

        var extname = path.extname(filePath);
        var contentType = 'text/html';

        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
            break;
            case '.css':
                contentType = 'text/css';
            break;
            case '.png':
                contentType = 'image/png';
            break;
            case '.jpg':
                contentType = 'image/jpg';
            break;
            case '.svg':
                contentType = 'image/svg+xml';
            break;
            case '.html':
                contentType = 'text/html';
            break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end();
                }
            }
            else {
                let defaultHeaders = {
                    'Content-Type': contentType,
                    'Cache-Control': 'no-cache'
                };

                let mergedHeaders =
                    Object.assign(
                        defaultHeaders,
                        additionalHeaders
                    );

                response.writeHead(200, mergedHeaders);
                response.end(content, 'utf-8');
            }
        });
    }).listen(port, '127.0.0.1');

    console.log(`Server running at https://${hostname}:${port}/`);
}

function post(hostname, dispatch, callback) {
    const data = {};

    const options = {
        hostname: hostname,
        path: '/?dispatch=' + dispatch + '&store_access_key=csse&no_redirect',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const req = http.request(options).on('response', function(response) {
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

function downloadIMG(url) {
    let file = fs.createWriteStream('preloader.jpg');
    let request = https.get(url, response => {
        response.pipe(file);
    });
}

function downloadJSON(json) {
    fs.writeFileSync('preloader.js', 'var prealoderData = ' + json + '; module.exports.prealoderData = prealoderData;');
}

function parseCookies (request) {
    let list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}