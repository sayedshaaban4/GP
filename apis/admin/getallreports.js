const express = require('express');
const Report = require('../../models/report');
const User = require('../../models/user');
const token = require('../middlewares/token');
const getAllReports = express.Router();

getAllReports.get('/api/admin/getallreports' , token , async (req , res) => {
    try{
        const user = await User.findById(req.user);
        if(user.type === 'Driver'){
            return res.status(400).json({msg : 'Invalid Access'});
        }
        const result = await Report.find({},{_id : 0 , __v : 0});
        res.json({result});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = getAllReports;