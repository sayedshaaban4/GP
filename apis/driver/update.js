const express = require('express');
const Report = require('../../models/report');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const updateData = express.Router();

updateData.post('/api/driver/update' , async (req , res) => {
    try{
        const {userName , password , email , phone , governorate} = req.body;
        
        const existingUser1 = await User.findOne({email});
        if(existingUser1 && existingUser1.userName!=userName){
            return res.status(400).json({msg : 'User with this Email Already exist!'});
        }

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email.match(re)) {
            return res.status(400).json({msg : 'your Email is invalid!'});
        }

        const existingUser2 = await User.findOne({phone});
        if(existingUser2 && existingUser2.userName!=userName){
            return res.status(400).json({msg : 'User with this Phone Already exist!'});
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

        res.status(200).json({msg : 'updated success'});

    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = updateData;