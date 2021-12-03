const https = require('https')

const logging = require('./logging.js')

async function post(hostname, dispatch, callback) {
    const options = {
        hostname: hostname,
        path: '/?dispatch=' + dispatch,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return new Promise((res, rej) => {
        const req = https.request(options).on('response', function(response) {
            var data = ''
            
            response.on('data', function(chunk) {
                data += chunk
            })
    
            response.on('end', function() {
                try {
                    res(JSON.parse(data))
                }
                catch(e) {
                    console.log(e)
                    logging.log(e)
                }
            })
        }).on('error', error => {
            console.error(error)
        }).end()
    })
}

module.exports.post = post