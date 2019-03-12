const fs = require('fs');
const path = require('path');
console.log(path.join(__dirname + 'public', 'a.md'))
fs.readFile(path.join(__dirname + '/public', 'a.md'), function (err, data) {
    if (err) {
        console.log("文件不存在！");
    } else {
        console.log(data);
        
    }
});