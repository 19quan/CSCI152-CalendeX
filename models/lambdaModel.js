const mongoose = require('mongoose');

//everything created using this schema SHOULD expire after 30 seconds

const eventSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    expire_at: {type: Date, default: Date.now, expires: 30}
}, {versionKey: false});

//eventSchema.index({expire_at: 1 }, { expireAfterSeconds: 30 });


module.exports = mongoose.model('Lambda', eventSchema, 'lambdapush');