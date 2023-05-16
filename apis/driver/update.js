const express = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const updateData = express.Router();

updateData.post('/api/driver/update' , async (req , res) => {
    try{
        const {userName , password , email , phone , licence , nationalId , governorate , avgScore} = req.body;

        const hashedPassword = await bcryptjs.hash(password,14);

        await User.findOneAndUpdate({userName} , {password : hashedPassword}).clone();
        await User.findOneAndUpdate({userName} , {email : email}).clone();
        await User.findOneAndUpdate({userName} , {phone : phone}).clone();
        await User.findOneAndUpdate({userName} , {governorate : governorate}).clone();

        const user = await User.findOne({userName});
        res.json({user});

    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = updateData;