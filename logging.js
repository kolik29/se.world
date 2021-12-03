const fs = require('fs');
const path = require('path')

function log(str) {
    let pathFile = path.join(__dirname + '/server.log'),
        date = new Date()

    if (fs.existsSync(pathFile)) {
        let fileStat = fs.statSync(pathFile)
        
        if (fileStat.size > 1048576)
            fs.rename(pathFile, path.join(__dirname + 'server.' + date.getDate() + format((date.getMonth() + 1).toString()) + date.getFullYear() + '_' + format(date.getHours().toString()) + format(date.getMinutes().toString()) + '.log'))
    } else
        fs.writeFile(pathFile, '', () => {})

    if (typeof str == 'object')
        str = JSON.stringify(str)

    fs.appendFile(pathFile,
        date.getDate() + '.' + format((date.getMonth() + 1).toString()) + '.' + date.getFullYear() + ' ' + format(date.getHours().toString()) + ':' + format(date.getMinutes().toString()) + ':' + format(date.getSeconds().toString()) + ': ' + str + '\n',
        () => {})
}

function format(num) {
    if (num.length < 2)
        return '0' + num
    
    return num
}

module.exports.log = log