const mongoose = require('mongoose');

let genreSchema = new mongoose.Schema({
    genreName: {type: mongoose.Schema.Types.String, required: true},
    memeList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meme'}]
});

module.exports = mongoose.model('Genre', genreSchema);