const mongoose = require('mongoose');

//userSchema for students
const userSchema = new mongoose.Schema({
    _id: {
        required: true,
        type: Number
    },
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
    gender: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    seniority: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);