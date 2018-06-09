const mongoose = require('mongoose');
const connectionString = `mongodb://localhost:27017/memes`;
mongoose.Promise = global.Promise;

require('../models/Genre');
require('../models/Meme');

module.exports = () => {
    mongoose.connect(connectionString);
    let db = mongoose.connection;

    db.once('open', (err) => {
        if(err) {
            throw err;
        }
        console.log('MongoDb ready!');
    });

    db.on('error', (err) => console.log(`Db error: ${err}`));
};
