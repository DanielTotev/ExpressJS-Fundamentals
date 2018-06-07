const fs = require('fs');

module.exports = (filePath, contentType ,res) => {
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': contentType
        });
        res.write(data);
        res.end();
    })
};