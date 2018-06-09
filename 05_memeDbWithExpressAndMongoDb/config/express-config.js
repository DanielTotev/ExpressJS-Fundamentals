const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');


module.exports = (app) => {
    //serve static files
    app.use('/public', express.static('public'));

    //form-parser
    app.use(bodyParser.urlencoded({ extended: true }));

    //file parser
    app.use(fileUpload());

    //config view engine
    app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
};