const express = require('express');
const Model = require('../models/eventModel');

const router = express.Router()

module.exports = router;

//retrieves all events in database
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//mongo automatically generates objectids when using post
//this retrieves specified event using generated mongo id
router.get('/getbyID/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//updates existing event by ID
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

//creates a new event
router.post('/post', async (req, res) => {
    const data = new Model({
        datetimePrimaryLine: req.body.datetimePrimaryLine,
        datetimeSecondaryLine: req.body.datetimeSecondaryLine,
        dividerColor: req.body.dividerColor,
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        link: req.body.link
    });

    try {
        const dataSave = await data.save();
        res.status(200).json(dataSave);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//deletes an event by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Event (${data.title}) with ID:${id} has been successfully deleted.`);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});