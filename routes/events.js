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
        title: req.body.title,
        desc: req.body.desc,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })
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