const express = require('express');
const Model = require('../models/lambdaModel');

const router = express.Router()

module.exports = router;

//for posting to the lambdapush collection using postman

router.post('/post', async (req, res) => {
    const data = new Model({
        date: req.body.date
    });

    try {
        const dataSave = await data.save();
        res.status(200).json(dataSave);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});