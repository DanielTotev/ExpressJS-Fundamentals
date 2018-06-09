const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    url: {type: mongoose.Schema.Types.String, required: true},
    title: {type: mongoose.Schema.Types.String, required: true},
    yearOfRelease: {type: mongoose.Schema.Types.Number, required: true},
    author: {type: mongoose.Schema.Types.String, required: true}
});

module.exports = mongoose.model('Book', bookSchema);