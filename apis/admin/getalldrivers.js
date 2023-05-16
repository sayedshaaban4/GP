const express = require('express');
const User = require('../../models/user');
const token = require('../middlewares/token');
const getAllDrivers = express.Router();

getAllDrivers.get('/api/admin/getalldrivers' , token , async (req , res) => {
    try{
        const user = await User.findById(req.user);
        if(user.type === 'Driver'){
            return res.status(400).json({msg : 'Invalid Access'});
        }
        const result = await User.find({type : 'Driver'},{_id : 0 , password : 0 , type : 0 , __v : 0 , reportsValue : 0 , reportsCount : 0});
        res.json({result});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = getAllDrivers;