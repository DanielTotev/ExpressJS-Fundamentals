const express = require('express');
const port = 3000;

let app = express();

require('./config/db')();
require('./config/express-config')(app);
require('./config/routes')(app);

app.listen(port);