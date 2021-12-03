const fs = require('fs')
const path = require('path')
const webp = require('webp-converter')
const gm = require('gm').subClass({ imageMagick: true })

const serverLogging = require('./logging.js')

webp.grant_permission();

function convert(file_path, size, convert) {
    let name = file_path.split('/').last(),
        extension = name.split('.').last()

    if (convert) {
        if (!fs.existsSync(path.join(__dirname, 'images/' + size)))
            fs.mkdirSync(path.join(__dirname, 'images/' + size))
        
        if (extension == 'jpg' || extension == 'jpeg') {
            gm(file_path)
            .strip()
            .interlace('Line')
            .quality(50)
            .resize(size, size)
            .write(path.join(__dirname, 'images/' + size + '/' + name), (err) => {
                if (err) {
                    console.log(err)
                    serverLogging.log(err)
                }
            })

            console.log('progressiveJPEG: ' + name)
            serverLogging.log('progressiveJPEG: ' + name)
        }
        
        if (extension == 'png') {
            webp.cwebp(file_path, path.join(__dirname, 'images/' + size + '/' + name.split('.')[0] + '.webp'), "-q 10", logging="-v").then(() => {
                console.log('webp: ' + name)
                serverLogging.log('webp: ' + name)
            })

            fs.copyFile(file_path, path.join(__dirname, 'images/' + size + '/' + name), err => {
                if (err) {
                    console.log(err)
                    serverLogging.log(err)
                }

                console.log('copy file: ' + name)
                serverLogging.log('copy file: ' + name)
            })
        }
    }
    
    return name
}

Array.prototype.last = function() {
    return this[this.length - 1]
}

module.exports.convert = convert