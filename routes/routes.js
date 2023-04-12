const express = require('express');
const Model = require('../models/model');

const router = express.Router()

module.exports = router;

//retrieves all existing users in database
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
//this retrieves data using mongo's id
router.get('/getbyID/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//updates existing user by ID
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

//creates a new user with specified parameters
router.post('/post', async (req, res) => {
    const data = new Model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        seniority: req.body.seniority
    })

    try {
        const dataSave = await data.save();
        res.status(200).json(dataSave);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//deletes an existing user by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`User (${data.firstName} ${data.lastName}) with ID:${id} has been deleted.`);
    }
    catch (error) {
        res.status(400).json({ message: error.message});
    }
});