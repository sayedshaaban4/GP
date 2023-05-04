const express = require('express');
const user = require('../models/user');

const test = express.Router();

test.get('/test', (req , res) =>{
    res.json({MSG : 'sayed'});
});

test.post("/api/signup" , async (req,res) => {
    const {name , email , phone , licence , NationalID , Password} = req.body;

    user
})

module.exports = test;
