const HOME_CONTROLLER = require("./home");
const STATIC_CONTROLLER = require("./static");
const FAVICON_CONTROLLER = require("./favicon");
const ERROR_HANDLER = require("../handlers/error");
const FILM_HANDLER = require("../handlers/film");
const STATUS_CONTROLLER = require("./status");

module.exports = [STATUS_CONTROLLER, HOME_CONTROLLER, STATIC_CONTROLLER, FAVICON_CONTROLLER, FILM_HANDLER, ERROR_HANDLER];