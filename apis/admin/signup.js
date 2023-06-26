const express = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const adminSignupRouter = express.Router();

adminSignupRouter.post('/api/admin/signup' , async (req , res) => {

    try{
        const {userName , password , email , phone , licence , nationalId , governorate , type} = req.body;

        const existingUser0 = await User.findOne({userName});
        if(existingUser0){
            return res.status(400).json({msg : 'User with this Name Already exist!'});
        }
        
        const existingUser1 = await User.findOne({email});
        if(existingUser1){
            return res.status(400).json({msg : 'User with this Email Already exist!'});
        }

        const existingUser2 = await User.findOne({phone});
        if(existingUser2){
            return res.status(400).json({msg : 'User with this Phone Already exist!'});
        }
        
        const existingUser3 = await User.findOne({nationalId});
        if(existingUser3){
            return res.status(400).json({msg : 'User with this National ID Already exist!'});
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
        res.status(500).json({error: e.message});
    }
    
});

module.exports = adminSignupRouter;