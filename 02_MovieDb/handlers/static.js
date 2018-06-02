const FILE_READER = require("../helpers/readFile");

const CONTENT_TYPES = {
    "html": "text/html",
    "css": "text/css",
    "js": "application/javascript",
    "json": "application/json",
    "ico": "image/x-icon",
    "png": "image/png"
};

function staticHandler(req, res) {
    if(req.path.startsWith("/public/") && req.method == "GET") {
        let contentType = CONTENT_TYPES[req.path.split(".")[1]];
        FILE_READER("." + req.path, contentType, res);
    } else {
        return true;
    } 
}

module.exports = staticHandler;