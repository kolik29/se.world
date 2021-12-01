const redis = require('redis')
const client = redis.createClient()

class DB {
    constructor() {
        this.client = client;
        this.client.on('error', (err) => {
            console.log('Error ' + err)
        })
        this.client.connect()
    }

    async set(key, data) {
        await this.client.set(key, JSON.stringify(data), redis.print)
    }

    async get(key) {
        return await this.client.get(key)
    }

    async del(key) {
        this.client.connect()
        this.client.del(key)
    }
}

module.exports.DB = DB;