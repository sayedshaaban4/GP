const express = require('express');
const Report = require('../../models/report');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const updateInfoRouter = express.Router();

updateInfoRouter.post('/api/driver/update-info' , async (req , res) => {
    try{
        const {userName , password , email , phone , governorate} = req.body;
        
        const driverWithSameEmail = await User.findOne({email});
        if(driverWithSameEmail && driverWithSameEmail.userName !== userName){
            return res.status(400).json({msg : 'Driver with this Email Already exist!'});
        }

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email.match(re)) {
            return res.status(400).json({msg : 'your Email is invalid!'});
        }

        const driverWithSamePhone = await User.findOne({phone});
        if(driverWithSamePhone && driverWithSamePhone.userName !== userName){
            return res.status(400).json({msg : 'Driver with this Phone Already exist!'});
        }

        if(phone.length!==11) {
            return res.status(400).json({msg : 'your Phone is invalid!'});
        }

        const hashedPassword = await bcryptjs.hash(password,14);

        await User.findOneAndUpdate({userName} , {password : hashedPassword}).clone();
        await User.findOneAndUpdate({userName} , {email : email}).clone();
        await User.findOneAndUpdate({userName} , {phone : phone}).clone();
        await User.findOneAndUpdate({userName} , {governorate : governorate}).clone();
        await Report.findOneAndUpdate({userName} , {phone : phone}).clone();

        res.status(200).json({msg : 'updated successfully'});
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = updateInfoRouter;