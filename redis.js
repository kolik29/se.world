const redis = require('redis')
const client = redis.createClient()

const serverConfig = require('./server-config.js')

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
        this.client.set(serverConfig.configюdb_prefix + key, JSON.stringify(data), redis.print)
    }

    async get(key) {
        return JSON.parse(await this.client.get(serverConfig.configюdb_prefix + key))
    }

    async del(key) {
        this.client.del(serverConfig.configюdb_prefix + key)
    }
}

module.exports.DB = DB;