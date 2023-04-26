const mongoose = require('mongoose');

const weekfromNow = 7*24*60*60*1000 // 168 hours (7 days) calculation in milliseconds.

//schema for events
const eventSchema = new mongoose.Schema({
    datetimePrimaryLine:String,
    datetimeSecondaryLine: {
        type: Date,
        default: Date.now
    },
    dividerColor: {
        type: String,
        default: "theme:focal_link_color"
    },
    title: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    link: {
        relativePath: {
            type: String,
            default: "./detail.desk.json"
        }
    }
}, {versionKey: false});

module.exports = mongoose.model('Event', eventSchema);