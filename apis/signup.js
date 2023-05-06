const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const signupRouter = express.Router();

signupRouter.post('/api/signup' , async (req , res) => {

    try{
        const {userName , password} = req.body;

        const existingUser = await User.findOne({userName});
        if(existingUser){
            return res.status(400).json({msg : 'User with this UserName Already exist!'});
        }

        const hashedPassword = await bcryptjs.hash(password,14);
    
        let user = new User({
            userName,
            password : hashedPassword,
        });
        user = await user.save();
        res.json({user});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
});

module.exports = signupRouter;