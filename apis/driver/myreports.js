const express = require('express');
const Report = require('../../models/report');
const User = require('../../models/user');
const token = require('../middlewares/token');
const myReportsRouter = express.Router();

myReportsRouter.get('/api/driver/my-reports' , token , async (req , res) => {
    try{
        const user = await User.findById(req.user);
        if(user.type === 'Admin'){
            return res.status(400).json({msg : 'Invalid Access'});
        }

        const userName = user.userName;
        const reports = await Report.find({userName} , {_id : 0 , __v : 0});
        res.json({reports});
    } catch (e) {
        res.status(500).json({msg: e.message}) ;
    }
});

module.exports = myReportsRouter;