const homeHandler = require('./homeHandler')
const memeHandler = require('./memeHandler')
const staticHandler = require('./staticHandler')
const dataHandler = require('./dataHandler');

module.exports = [homeHandler, memeHandler, dataHandler, staticHandler]
