const https = require('https')

function post(hostname, dispatch, callback) {
    const data = {}

    const options = {
        hostname: hostname,
        path: '/?dispatch=' + dispatch,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const req = https.request(options).on('response', function(response) {
        var data = ''
        
        response.on('data', function(chunk) {
            data += chunk
        })

        response.on('end', function() {
            callback(JSON.parse(data))
        })
    }).end()

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

module.exports.post = post