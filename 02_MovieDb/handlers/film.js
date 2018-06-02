const FILE_READER = require("../helpers/readFile");
const data = require("../config/dataBase");
const decodeUri = require("decode-uri-component");
const qs = require("querystring");
const ERROR_DIV = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';
const SUCCESS_DIV = '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>';


function filmController(req, res) {
    if (req.path == "/addMovie" && req.method == "GET") {
        FILE_READER("./views/addMovie.html", "text/html", res);
    } else if (req.path == "/addMovie" && req.method == "POST") {
        let movieData = "";
        req.on("data", (data) => movieData += data);
        req.on("end", () => {
            movieData = qs.parse(movieData);
            if (!movieData.movieTitle || !movieData.moviePoster) {
                FILE_READER("./views/addMovie.html", "text/html", res, ERROR_DIV);
            } else {
                data.push(movieData);
                FILE_READER("./views/addMovie.html", "text/html", res, SUCCESS_DIV);
            }
        });
    } else if (req.path == "/viewAllMovies" && req.method == "GET") {
        let moviesString = "";
        for (let i = 0; i < data.length; i++) {
            let film = data[i];
            moviesString += `<a href="/movies/details/:${i}"><div class="movie">
                <img class="moviePoster" src="${decodeUri(film.moviePoster)}"/>          
              </div></a>`;
        }
        FILE_READER("./views/viewAll.html", "text/html", res, moviesString);
    } else if (req.path.startsWith("/movies/details/") && req.method == "GET") {
        let id = Number(req.path.split(":")[1]);
        let film = data[id];
        let replaceString = `Replacement: <div class="content">
        <img src="${decodeUri(film.moviePoster)}" alt=""/>
        <h3>Title  ${film.movieTitle}</h3>
        <h3>Year ${decodeUri(film.movieYear)}</h3>
        <p> ${decodeURI(film.movieDescription)}</p>
        </div>`;
        FILE_READER("./views/details.html", "text/html", res, replaceString);        

    } else {
        return true;
    }
}

module.exports = filmController;