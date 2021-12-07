const fs = require('fs');
const path = require('path')

function log(str, to_file = 'server.log') {
    let pathFile = path.join(__dirname + '/' + to_file),
        date = new Date()

    if (fs.existsSync(pathFile)) {
        let fileStat = fs.statSync(pathFile)
        
        if (fileStat.size > 1048576)
            fs.rename(
                pathFile,
                path.join(__dirname + to_file.split('.')[0] + date.getDate() + format((date.getMonth() + 1).toString()) + date.getFullYear() + '_' + format(date.getHours().toString()) + format(date.getMinutes().toString()) + '.' + to_file.split('.')[1]),
                err => {
                    if (err)
                        console.log(err)
                }
            )
    } else
        fs.writeFile(
            pathFile,
            '',
            err => {
                if (err)
                    console.log(err)
            }
        )

    if (typeof str == 'object')
        str = JSON.stringify(str)

    fs.appendFile(
        pathFile,
        date.getDate() + '.' + format((date.getMonth() + 1).toString()) + '.' + date.getFullYear() + ' ' + format(date.getHours().toString()) + ':' + format(date.getMinutes().toString()) + ':' + format(date.getSeconds().toString()) + ': ' + str + '\n',
        err => {
            if (err)
                console.log(err)
        }
    )
}

function format(num) {
    if (num.length < 2)
        return '0' + num
    
    return num
}

module.exports.log = log