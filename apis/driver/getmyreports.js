const express = require('express');
const Report = require('../../models/report');
const User = require('../../models/user');
const token = require('../middlewares/token');
const getMyReports = express.Router();

getMyReports.get('/api/driver/getmyreports' , token , async (req , res) => {
    try{
        const user = await User.findById(req.user);
        if(user.type !== 'Driver'){
            return res.status(400).json({msg : 'Invalid Access'});
        }

        const userName = user.userName;
        const result = await Report.find({userName},{_id : 0 , __v : 0});
        res.json({result});
    } catch (e) {
        res.status(500).json({error: e.message}) ;
    }
});

module.exports = getMyReports;