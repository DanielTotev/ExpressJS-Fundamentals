const mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    url: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    creationDate: {type: Date, required: true, default: Date.now()},
    tags: {type: [mongoose.Schema.Types.ObjectId],  ref: 'Tag'}
});

module.exports = mongoose.model('Image', imageSchema);