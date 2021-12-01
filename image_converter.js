const fs = require('fs')
const webp = require('webp-converter')
const gm = require('gm').subClass({imageMagick: true})

function convert(path) {
    let name = path.split('/').last(),
        extension = name.split('.').last()
    
    if (extension == 'jpg' || extension == 'jpeg')
        gm(path).write('images/' + name, (err) => {
            if (err)
                console.log(err)
        })
    
    if (extension == 'png') {
        webp.cwebp(path, path.join(__dirname, 'images/' + name.split('.')[0] + '.webp'), "-q 10", logging="-v");
        fs.copyFile(path, 'images/' + name)
    }
    
    return name
}

Array.prototype.last = function() {
    return this[this.length - 1]
}

module.exports.convert = convert