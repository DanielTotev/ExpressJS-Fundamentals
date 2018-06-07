const mongoose = require('mongoose');
const CONNECTION_STRING = 'mongodb://localhost:27017/mongoPlayGround'

mongoose.Promise = global.Promise;

require('../models/ImageSchema');
require('../models/TagSchema');

module.exports = () => {
    mongoose.connect(CONNECTION_STRING);
    let connection = mongoose.connection;

    connection.once('open', (err) => {
        if (err) {
            console.log(err);
        }

        console.log('MongoDb ready!');
    });
}