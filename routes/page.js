const express = require('express');
const Model = require('../models/pageModel');

const router = express.Router()

module.exports = router;

router.get('/get', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
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