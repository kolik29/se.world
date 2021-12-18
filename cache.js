const redis = require('./redis.js')
const post = require('./post.js')
const image_converter = require('./image_converter.js')
const { parentPort } = require('worker_threads')

const serverConfig = require('./server-config.js')

const logging = require('./logging.js')

const db = new redis.DB()

db.openSocket()

async function caching(convert = false) {
    let dispatches = ['products_expected', 'products_in_stock', 'products_out_of_stock'],
        products

    console.log('caching start!')
    logging.log('caching start!')

    for (dispatch of dispatches) {
        products = await getImages(await post.post(serverConfig.config.postHost, 'seworld.' + dispatch + '&store_access_key=csse&no_redirect'), convert)
        await db.set(dispatch, products)
    }

    console.log('caching end!')
    logging.log('caching end!')

    return { chachingFinished: true }
}

function getImages(products, convert) {
    for (let i in products) {
        let product = products[i]
        
        if ('pairs' in product) {
            if ('main_pair' in product.pairs) {
                let main_pair = {}
                
                for (let size in product.pairs.main_pair)
                    if (!isNaN(Number(size)))
                        main_pair[size] = '/images/' + size + '/' + image_converter.convert(product.pairs.main_pair[size].absolute_path, size, convert)

                product.pairs.main_pair = main_pair
            }

            if ('pairs' in product.pairs) {
                let product_pairs_size = {};

                let product_pairs_pairs = product.pairs.pairs
                product.pairs.pairs = []
                
                for (let id in product_pairs_pairs) {
                    product_pairs_size = {};
                    
                    for (let size in product_pairs_pairs[id])
                        if (!isNaN(Number(size)))
                            product_pairs_size[size] = '/images/' + size + '/' + image_converter.convert(product_pairs_pairs[id][size].absolute_path, size, convert)
        
                    product.pairs.pairs.push(product_pairs_size)
                }
            }
        }

        if ('details_main_pair' in product)
            if ('detailed' in product.details_main_pair)
                product.details_main_pair = '/images/1600/' + image_converter.convert(product.details_main_pair.detailed.absolute_path, 1600, convert)

        if ('preloader_image_pairs' in product)
            for (let key in product.preloader_image_pairs)
                if ('detailed' in product.preloader_image_pairs[key])
                    product.preloader_image_pairs[key] = '/images/1600/' + image_converter.convert(product.preloader_image_pairs[key].detailed.absolute_path, 1600, convert)
    }

    return products;
}

// module.exports.caching = caching;

async function main() {
    await caching(true)
    parentPort.postMessage({ workerFinished: true })
}

main()