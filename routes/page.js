const express = require('express');
const moment = require('moment-timezone');
const Model = require('../models/pageModel');
const events = require('../models/eventModel');
const lambda = require('../models/lambdaModel');
const fs= require('fs');
const data2=JSON.parse(fs.readFileSync('template.json','utf-8'));
const data3=JSON.parse(fs.readFileSync('eventlisttemplate.json','utf-8'));
//const eventdata=JSON.parse(fs.readFileSync('eventtemplate.json','utf-8'));


const router = express.Router()

module.exports = router;

router.delete('/refresh', async(req,res) => {
    const event = await events.find();
    var eventlength = Object.keys(event).length;

    let curr_date = new moment();
    let today = curr_date.format("YYYY-MM-DD")
    var curr_time = new moment();
    let todaytime = curr_time.tz('America/Los_Angeles').format("HH:mm")

    try {
        for(let i = 0; i < eventlength; i++) {
            console.log(event[i].endDate);
            console.log(event[i].endTime);

            if (today >= event[i].endDate) {
                if(todaytime > event[i].endTime) {
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
    let todaydate= new Date();
    todaydate=todaydate.toISOString().split('T')[0]
    let calendardate=todaydate;
    try{
        for(let i = 0; i < eventlength; i++) {
            if (lambdalength == 0) {
                if(event[i].datetimePrimaryLine == todaydate)
                {
                    data.push(event[i]);
                    //console.log('1'); //for debugging
                }
            }
            else if (lambdalength != 0) {
                if(event[i].datetimePrimaryLine == lambdapush[lambdalength - 1].date) {
                    data.push(event[i]);
                    calendardate=lambdapush[lambdalength-1].date
                }
                await lambda.deleteMany({});
                //console.log('2'); //for debugging
            }
        }
        
        for(let i = 0; i < eventlength; i++) {
            data.sort(function(a,b) {
                var keyA = a.datetimeSecondaryLine,
                    keyB = b.datetimeSecondaryLine;
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
            });
        }

        data2.content[1].content[0].items = data;
        res.json(data2);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/getallevents', async (req, res) => {
    //const data = data2.content[1].content[0].items;
    var data = [];
    const event = await events.find();
    var eventlength = Object.keys(event).length;

    try{
        for(let i=0; i < eventlength; i++)
        {
            data.push(event[i]);
        }

        for(let i = 0; i < eventlength; i++) {
            data.sort(function(a,b) {
                var keyA = a.datetimePrimaryLine,
                    keyB = b.datetimePrimaryLine;
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
            });
        }
        data3.content[1].items = data;
        res.json(data3);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//depreciated functions, kept for reference
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
