const express = require('express');
const User = require('../../models/user');
const Report = require('../../models/report');
const token = require('../middlewares/token');
const tripReportRouter = express.Router();

// hayb2a mab3oot ntayg l 3 models fl request w kman user data , l mafrood
// addreport.post('/api/driver/addreport',token , async (req , res) => {
//     try{
//         const user = await User.findById(req.user);  
//         res.json({...user._doc});
//     }catch (e) {
//         res.status(500).json({msg:"wrong"});
//     }
// });


tripReportRouter.post('/api/driver/trip-report' , async (req , res) => {
    try{
        const {userName  , phone , licence , model_1 , model_2 , model_3 , total , source , destination} = req.body;
        const checkUser1 = await User.findOne({userName});
        const checkUser2 = await User.findOne({phone});
        const checkUser3 = await User.findOne({licence});
        
        if(!checkUser1 || !checkUser2 || !checkUser3){
            return res.status(400).json({msg : 'Invalid user information!'});
        }
        
        if(checkUser1.nationalId !== checkUser2.nationalId && checkUser1.nationalId !== checkUser3.nationalId){
            return res.status(400).json({msg : 'Invalid user information!'});
        }
        
        const cnt = await Report.count({"userName" : userName});

        const date_ob = new Date();
        const day = ("0" + date_ob.getDate()).slice(-2);
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        const year = date_ob.getFullYear();

        const date = String(String(year) + "-" + String(month) + "-" + String(day));

        const hours = date_ob.getHours();
        const minutes = date_ob.getMinutes();

        const time = String(String(hours) + ":" + String(minutes));

        
        let report = new Report({
            id : cnt+1,
            userName,
            phone,
            licence,
            model_1,
            model_2,
            model_3,
            total,
            date,
            time,
            source,
            destination
        });

        const user = await User.findOne({userName});

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