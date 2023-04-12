const mongoose = require('mongoose');

//userSchema for students
//TODO: create a schema for events
const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    seniority: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);