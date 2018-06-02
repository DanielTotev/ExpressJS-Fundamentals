const fs = require("fs");
let encoding;

function readFile(path, contentType, res, replaceData) {
    if(contentType == "text/html"){
        encoding = "utf8";
    }else {
        encoding = null;
    }

    fs.readFile(path, encoding , (err, data) => {
        if(err){
            console.log(err);
            res.end();
            return;
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });
        
        if(replaceData){
            data = data.replace("{{replaceMe}}", replaceData);
        }

        res.write(data);
        res.end();
    });
}

module.exports = readFile;