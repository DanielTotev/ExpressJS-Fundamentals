const http = require("http");
const port = 5000;
const url = require("url");
const controllers = require("./handlers");

let server = http.createServer(frontController);


function frontController(req, res){
    req.path = url.parse(req.url).path;
    for(let controller of controllers){
        if(controller(req, res) !== true){
            break;
        }
    }
}


server.listen(port);