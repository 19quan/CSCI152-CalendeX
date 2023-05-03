const mongoose = require('mongoose');
const moment = require('moment-timezone');
const PST = moment.tz("America/Los_Angeles");
var time = PST.format("h:mm A");
var date = PST.format("MMM-D-YYYY");

//schema for events
const eventSchema = new mongoose.Schema({
    datetimePrimaryLine: {
        type: String,
        default: date
    },
    datetimeSecondaryLine: {
        type: String,
        default: time
    },
    endDate: {
        type: String,
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
    }
}, {versionKey: false});

eventSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) { delete ret.id, delete ret._id, delete endDate }
});

module.exports = mongoose.model('Event', eventSchema);