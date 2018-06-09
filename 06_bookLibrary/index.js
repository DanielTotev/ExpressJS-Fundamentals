const express = require('express');
const app = express();
const port = 1337;

require('./config/db')();
require('./config/express-config')(app);
require('./config/routes')(app);

app.listen(port, () => `App is up and running on port ${port}...`);