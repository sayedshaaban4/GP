const express = require('express');

const test = express.Router();

test.get('/test', (req , res) =>{
    res.json({MSG : 'sayed'});
});

module.exports = test;
