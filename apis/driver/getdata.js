const express = require('express');
const User = require('../../models/user');
const token = require('../middlewares/token');
const getData = express.Router();

getData.get('/api/driver/getdata' , token , async (req , res) => {
    const user = await User.findById(req.user);
    const result = await User.find({userName : user.userName},{_id : 0 , password : 0 , type : 0 , __v : 0 , reportsValue : 0 , reportsCount : 0});
    res.json({result});
});

module.exports = getData;