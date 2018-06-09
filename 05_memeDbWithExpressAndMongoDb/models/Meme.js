const mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
    memeSrc: {type: mongoose.Schema.Types.String, required: true},
    dateOfCreation: {type: mongoose.Schema.Types.Date, default: Date.now()},
    description: {type: mongoose.Schema.Types.String, required: true},
    title: {type: mongoose.Schema.Types.String, required: true},
    isPrivate: {type: mongoose.Schema.Types.Boolean, required: true}
});

module.exports = mongoose.model('Meme', memeSchema);