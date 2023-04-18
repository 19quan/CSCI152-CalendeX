const express = require('express');
const Model = require('../models/pageModel');
const events = require('../models/eventModel');
const fs= require('fs');
const data2=JSON.parse(fs.readFileSync('template.json','utf-8'));
const eventdata=JSON.parse(fs.readFileSync('eventtemplate.json','utf-8'));


const router = express.Router()

module.exports = router;

router.get('/get', async (req, res) => {
    try{

        const data = data2.content[1].content[0].content[2].items;
        const event = await events.find();
        for(let i=0;i<Object.keys(event).length;i++)
        {
            data[i].title=event[i].title;
            data[i].description=event[i].desc;
            data[i].datetimeSecondaryLine=event[i].startDate;
            data[i+1]=eventdata;
        }
        data2.content[1].content[0].content[2].items=data;
        res.json(data2)
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