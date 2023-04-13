const mongoose = require('mongoose');

const weekfromNow = 7*24*60*60*1000 // 168 hours (7 days) calculation in milliseconds.

//schema for events
const eventSchema = new mongoose.Schema({
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
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now() + weekfromNow
    }
});

module.exports = mongoose.model('Event', eventSchema);