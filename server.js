const express = require('express')
const app = express()
const serverConfig = require('./server-config.js')
const redis = require('./redis.js')
const db = new redis.DB()
const path = require('path')
const { Worker } = require('worker_threads')
const logging = require('./logging.js')
const urlencodedParser = express.urlencoded({extended: false})

main()

function main() {
    try {
        app.set('view engine', 'hbs')
        db.openSocket()

        startServer(true)

        app.listen(3001, () => {
            console.log(`Server running at https://${serverConfig.config.hostname}:${serverConfig.config.port}/`)
            logging.log(`Server running at https://${serverConfig.config.hostname}:${serverConfig.config.port}/`)
        })

        function startCacheWorker(workerData) {
            return new Promise((resolve, reject) => {
                const worker = new Worker('./cache.js', { workerData })
                worker.on('message', resolve)
                worker.on('error', reject)
                worker.on('exit', (code) => {
                if (code !== 0)
                        reject(new Error(`Worker stopped with exit code ${code}`))
                })
            })
        }

        async function startCache(convert_image) {
            const result = await startCacheWorker(convert_image)
            console.log(result);
            logging.log(result)
            startServer()
        }
        
        startCache(true).catch(err => console.error(err))

        setInterval(() => {
            startCache(true).catch(err => console.error(err))
        }, 3600000)

        async function startServer() {    
            let products_in_stock = await db.get('products_in_stock'),
                products_out_of_stock = await db.get('products_out_of_stock')
            
            let routes = [
                {
                    url: '',
                    file: 'index.hbs'
                },
                {
                    url: 'checkout',
                    file: 'checkout.hbs'
                },
                {
                    url: 'policy',
                    file: 'policy.hbs'
                },
                {
                    url: 'shipping-and-returns',
                    file: 'shipping-and-returns.hbs'
                },
                {
                    url: 'order-success',
                    file: 'order-success.hbs'
                },
                {
                    url: 'update_cache',
                    special: true
                },
                {
                    url: 'update_cache_image',
                    special: true
                },
                {
                    url: 'console_log_save',
                    special: true
                }
            ]
            
            for (let key in products_in_stock)
                routes.push({
                    url: products_in_stock[key].seo_name,
                    file: 'product.hbs'
                })
            
            for (let key in products_out_of_stock)
                routes.push({
                    url: products_out_of_stock[key].seo_name,
                    file: 'product.hbs'
                })
            
            for (let rout of routes)
                if (rout.special) {
                    app.get('/' + rout.url, async function() {
                        if (rout.url == 'update_cache')
                            startCache(false)
                        
                        if (rout.url == 'update_cache_image')
                            startCache(true)
                    })

                    app.post('/' + rout.url, urlencodedParser, async function(req, res) {
                        if(!req.body) return res.sendStatus(400)
                        console.log(JSON.parse(JSON.stringify(req.body)))
                        logging.log(JSON.stringify(req.body), 'front.log')
                        res.send('console_log_save: true')
                    })
                } else
                    app.get('/' + rout.url, async function(req, res) {
                        let pageData = {
                            timestamp: Date.now()
                        }
                        
                        products_in_stock = await db.get('products_in_stock')
                        products_out_of_stock = await db.get('products_out_of_stock')
                        
                        // if (rout.file == 'index.hbs' || rout.file == 'product.hbs' || rout.file == 'checkout.hbs') {
                            pageData['products_in_stock'] = products_in_stock
                            pageData['products_in_stock_string'] = JSON.stringify(products_in_stock)
                            pageData['products_out_of_stock'] = products_out_of_stock
                            
                            if (rout.file == 'index.hbs') {
                                let products_expected = await db.get('products_expected'),
                                product_expected
                                
                                if (products_expected.length == 0) {
                                    product_expected = {
                                        hide: true,
                                        product: {
                                            show: false
                                        }
                                    }
                                } else {
                                    let preloader_image_pairs = [];
                                    
                                    for (let key in products_expected[0].preloader_image_pairs)
                                    preloader_image_pairs.push(products_expected[0].preloader_image_pairs[key])
                                    
                                    products_expected[0].preloader_image_pairs = JSON.stringify(preloader_image_pairs)
                                    
                                    products_expected[0]['show'] = true
                                    
                                    product_expected = {
                                        hide: products_expected[0].show_preloader,
                                        product: products_expected[0]
                                    }
                                }
                                
                                pageData['preloader'] = product_expected
                                pageData['show_archive'] = Object.keys(products_out_of_stock).length > 0 ? true : false
                            }
                            
                            if (rout.file == 'product.hbs') {
                                let product;
                                
                                for (let key in products_in_stock)
                                    if (products_in_stock[key].seo_name == rout.url) {
                                        product = products_in_stock[key]
                                        products_in_stock[key]['current_product'] = true
                                    }
                                
                                pageData['out_of_stock'] = false
                                
                                if (!product) {
                                    for (let key in products_out_of_stock) {
                                        if (products_out_of_stock[key].seo_name == rout.url) {
                                            product = products_out_of_stock[key]
                                            products_out_of_stock[key]['current_product'] = true
                                        }
                                    }
                                    
                                    pageData['out_of_stock'] = true
                                }

                                let product_pairs = []

                                for (let i = 0; i < product.pairs.pairs.length; i++)
                                    product_pairs.push({
                                        src: product.pairs.pairs[i],
                                        description: product.pairs.descriptions[i]
                                    })
                                
                                product.pairs.pairs = product_pairs
                                
                                for (let key in product.variations)
                                    product.variations[key]['word'] = getSizeWord(product.variations[key].size)

                                if ('variations' in product)
                                    product.variations[product.size] = {
                                        product_id: product.id,
                                        count: product.count,
                                        size: product.size,
                                        word: getSizeWord(product.size),
                                    }
                                else
                                    product['variations'] = {
                                        [product.size]: {
                                            product_id: product.id,
                                            count: product.count,
                                            size: product.size,
                                            word: getSizeWord(product.size),
                                        }
                                    }
                                
                                for (let key in product.variations) {
                                    if (
                                        Number(product.variations[key].count) == 0
                                    ) {
                                        if (!pageData['out_of_stock'])
                                            delete product.variations[key]
                                    } else {
                                        product.variations[key]['type'] = product.type
                                        product.variations[key]['price'] = product.price
                                        product.variations[key]['name'] = product.name
                                        product.variations[key]['details_main_pair'] = product.details_main_pair
                                    }
                                }

                                if (product.variations)
                                    product.one_size = Object.keys(product.variations).length == 1 ? true : false
                                else
                                    product.one_size = true

                                pageData['product'] = product
                            }
                        // }

                        if (rout.url == 'order-success')
                            startCache(false)

                        res.render(path.join(__dirname + '/views/' + rout.file), pageData)
                    })
        }

        function getSizeWord(size) {
            if (size == 'one size')
                return ['', '']
            
            if (size[size.length - 1] == 'S')
                return ['mall', '小的']
            
            if (size[size.length - 1] == 'M')
                return ['edium', '中等的']
            
            if (size[size.length - 1] == 'L')
                return ['arge', '大的']

            return ['', '']
        }

        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    catch(err) {
        console.log(err)
        console.log('timeout: 5s')
        logging.log(err)
        logging.log('timeout: 5s')
        setTimeout(() => {
            main()
        }, 5000);
    }
}
