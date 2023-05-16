const express = require('express');
const User = require('../../models/user');
const token = require('../middlewares/token');
const getData = express.Router();

getData.get('/api/driver/getdata' , token , async (req , res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc , token : req.token});
});

module.exports = getData;