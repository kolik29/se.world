const https = require('https')
const axios = require('axios').default;

const logging = require('./logging.js')

async function post(hostname, dispatch, callback) {
    return new Promise((res, rej) => {
        let url = 'https://' + hostname + '/?dispatch=' + dispatch

        console.log('Post to: ' + url)
        logging.log('Post to: ' + url)

        axios.post(url)
            .then(responce => {
                console.log(responce.data)
                logging.log(responce.data)
                res(responce.data)
            }).catch(err => {
                console.log(err)
                logging.log(err)
            })
    })
}

module.exports.post = post