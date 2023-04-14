const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    metadata: {
        version:String,
        _id: false
    },
    contentContainerWidth: {type: String},
    content: [
        {
            elementType:String,
            borderColor:String,
            _id: false
        },
        {
            elementType:String,
            id:String,
            _id: false
        }
    ],
})

module.exports = mongoose.model('Page', pageSchema);