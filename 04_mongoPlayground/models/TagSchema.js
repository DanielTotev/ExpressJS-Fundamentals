const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let tagSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date, required: true, default: Date.now()},
    images: [{type: ObjectId, ref: 'Image'}]
});

tagSchema.virtual('tagName').get(function() {
    return this.name.toLowerCase();
});

module.exports = mongoose.model('Tag', tagSchema);