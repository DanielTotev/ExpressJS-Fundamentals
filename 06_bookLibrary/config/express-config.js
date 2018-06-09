const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

module.exports = (app) => {
    //Serve static files
    app.use('/static', express.static('static'));

    //Form parser
    app.use(bodyParser.urlencoded({extended: true}));

    //view engine
    app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
};