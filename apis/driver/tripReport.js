const express = require('express');
const User = require('../../models/user');
const Report = require('../../models/report');
const token = require('../middlewares/token');
const tripReportRouter = express.Router();



tripReportRouter.post('/api/driver/trip-report' ,token , async (req , res) => {
    try{

        const user = await User.findById(req.user);

        const {drowsinessRate  , distructionRate , calling , texting , drinking , reachingBehind , source , destination , date , time , deuration} = req.body;
        
        const userName = user.userName
        const total = (((200.0 - (distructionRate + drowsinessRate)) / 200.0 ) * 100.0)
        
        const cnt = await Report.count();
        
        let report = new Report({
            id : cnt+1,
            userName : userName,
            drowsinessRate : drowsinessRate,
            distractionRate : distractionRate,
            calling : calling,
            texting : texting,
            drinking : drinking,
            reachingBehind : reachingBehind,
            total : total,
            date : date,
            time : time,
            source : source,
            destination : destination,
            duration : duration,
        });

        await User.findOneAndUpdate({userName} , {reportsValue : user.reportsValue+total}).clone();
        await User.findOneAndUpdate({userName} , {reportsCount : user.reportsCount+1}).clone();
        await User.findOneAndUpdate({userName} , {avgScore : ((user.reportsValue+total)/(user.reportsCount+1))}).clone();
        
        report = await report.save();
        res.json({report});
    }catch (e) {
        res.status(500).json({msg:e.message});
    }
});

module.exports = tripReportRouter;