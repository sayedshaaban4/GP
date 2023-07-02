const express = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const addNewDriverRouter = express.Router();

addNewDriverRouter.post('/api/admin/add-new-driver' , async (req , res) => {
    try{
        const {userName , password , email , phone , licence , nationalId , governorate , type} = req.body;

        const driverWithSameName = await User.findOne({userName});
        if(driverWithSameName){
            return res.status(400).json({msg : 'Driver with this Name already exist!'});
        }

        const driverWithSameEmail = await User.findOne({email});
        if(driverWithSameEmail){
            return res.status(400).json({msg : 'Driver with this Email Already exist!'});
        }

        const driverWithSamePhone = await User.findOne({phone});
        if(driverWithSamePhone){
            return res.status(400).json({msg : 'Driver with this Phone Already exist!'});
        }

        const driverWithSameNationalId = await User.findOne({nationalId});
        if(driverWithSameNationalId){
            return res.status(400).json({msg : 'Driver with this National ID Already exist!'});
        }

        const hashedPassword = await bcryptjs.hash(password,14);

        let user = new User({
            userName,
            password : hashedPassword,
            email,
            phone,
            licence,
            nationalId,
            governorate,
            type,
        });

        user = await user.save();
        res.json({msg : 'Added Succesfully'});
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = addNewDriverRouter;