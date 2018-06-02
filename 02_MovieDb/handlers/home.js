const FILE_READER = require("../helpers/readFile");

function homeController(req, res){
    if(req.path == "/" && req.method == "GET") {
        FILE_READER("./views/home.html", "text/html", res);
    } else {
        return true;
    }
}


module.exports = homeController;