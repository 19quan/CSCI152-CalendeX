const mongoose = require('mongoose');

//userSchema for students
//TODO: create a schema for events
//TODO: adapt schema to xmodules compliant json format
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

//structure of events

/* const eventSchema = new mongoose.Schema({
    _id: {
        required: true,
        type: Number
    },
    title: {
        required: true,
        type: String
    },
    desc: {
        required: false,
        type: String
    },
    startDate: {
        required: true,
        type: Date
    },
    endDate: {
        required: true,
        type: Date
    }
})
 */
module.exports = mongoose.model('User', userSchema);
//module.exports = mongoose.model('Event', eventSchema);