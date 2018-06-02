const data = require('../config/dataBase');
const FILE_READER = require("../helpers/readFile");

function statusController(req, res) {
    if(req.headers['statusheader'] && req.method == "GET"){
        FILE_READER("./views/status.html", "text/html", res, data.length);
    } else {
        return true;
    }
}

module.exports = statusController;