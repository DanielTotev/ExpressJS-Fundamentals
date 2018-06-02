const FILE_READER = require("../helpers/readFile");

function faviconController(req, res) {
    if(req.url == "/favicon.ico" && req.method == "GET") {
        FILE_READER("./public/images/favicon.ico", "image/x-icon", res);
    } else {
        return true;
    }
}

module.exports = faviconController;