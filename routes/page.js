const express = require('express');
const moment = require('moment');
const Model = require('../models/pageModel');
const events = require('../models/eventModel');
const lambda = require('../models/lambdaModel');
const fs= require('fs');
const data2=JSON.parse(fs.readFileSync('template.json','utf-8'));
//const eventdata=JSON.parse(fs.readFileSync('eventtemplate.json','utf-8'));


const router = express.Router()

module.exports = router;

//TODO: Create a refresh button that gets the current date, then checks the
//      end date, IF currentdate > enddate then it will delete the stored date
//      IT WORKS, just needs to use End Dates rather than datetimePrimaryLine
router.delete('/refresh', async(req,res) => {
    const event = await events.find();
    let curr_date = new moment();
    let today = curr_date.format("YYYY-MM-DD")
    var eventlength = Object.keys(event).length;

    var curr_time = new moment();
    let todaytime = curr_time.format("HH:mm")

    try {
        for(let i = 0; i < eventlength; i++) {
            if (today > event[i].datetimePrimaryLine) {
                if(todaytime > event[i].datetimeSecondaryLine) {
                    await events.deleteOne({_id:event[i]._id});
                    console.log(`event (${event[i].title}) has been deleted`);
                }
                else {
                    console.log(`event (${event[i].title}) has not been deleted`);
                }
            }
            else {
                console.log(`event (${event[i].title}) has not been deleted`);
            }
        }
        res.send();
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/get', async(req, res) => {
    var data = [];
    const event = await events.find();
    const lambdapush = await lambda.find();
    var eventlength = Object.keys(event).length;
    var lambdalength = Object.keys(lambdapush).length;

    try{
        for(let i = 0; i < eventlength; i++) {
            if (lambdalength == 0) {
                data.push(event[i]);
                console.log('1'); //for debugging
            }
            else if (lambdalength != 0) {
                if(event[i].datetimePrimaryLine == lambdapush[lambdalength - 1].date) {
                    data.push(event[i]);
                }
                await lambda.deleteMany({});
                console.log('2'); //for debugging
            }
        }
        data2.content[1].content[0].items = data;
        res.json(data2);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//depreciated functions, kept for reference
router.get('/get1', async (req, res) => {
    try{
        //const data = data2.content[1].content[0].items;
        var data = [];
        const event = await events.find();

        for(let i=0; i < Object.keys(event).length; i++)
        {
            data.push(event[i]);
        }

        data2.content[1].content[0].items = data;
        res.json(data2);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/getbyDate/:date', async (req, res) => {
    try{
        //const data = data2.content[1].content[0].items;
        var data = [];
        const event = await events.find({datetimePrimaryLine: req.params.date});

        for(let i=0; i < Object.keys(event).length; i++)
        {
            data.push(event[i]);
        }

        data2.content[1].content[0].items = data;
        res.json(data2);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.post('/post', async (req, res) => {
    const data = new Model({
        metadata: req.body.metadata,
        contentContainerWidth: req.body.contentContainerWidth,
        content: req.body.content
    })
    try {
        const dataSave = await data.save();
        res.status(200).json(dataSave);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});
