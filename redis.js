const redis = require('redis')
const client = redis.createClient()

const logging = require('./logging.js')

class DB {
    constructor() {
        this.client = client
    }

    openSocket() {
        this.client.on('error', (err) => {
            console.log('Error ' + err)
            logging.log('Error ' + err)
        })
        this.client.connect()
    }

    set(key, data) {
        this.client.set(key, JSON.stringify(data), redis.print)
    }

    async get(key) {
        return JSON.parse(await this.client.get(key))
    }

    async del(key) {
        this.client.del(key)
    }
}

module.exports.DB = DB;