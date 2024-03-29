require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const eventRoute = require('./routes/events');
const pageRoute = require('./routes/page');
const lambdaRoute = require('./routes/lambda');
const moment = require('moment-timezone');
const PST = moment.tz("America/Los_Angeles");
const mongoString = process.env.DATABASE_URL;

const PORT = 3000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Connection to database established!');
})
const app = express();

app.use(express.json());
app.use('/users', userRoute);
app.use('/events', eventRoute);
app.use('/page', pageRoute);
app.use('/lambda', lambdaRoute);

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
})