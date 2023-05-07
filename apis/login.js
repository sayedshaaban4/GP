const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();

loginRouter.post('/api/login' , async (req , res) => {

    try{
        const {userName , password} = req.body;

        const user = await User.findOne({userName});

        if(!user){
            return res.status(400).json({msg : 'Wrong userName'});
        }

        const isMatch = await bcryptjs.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({msg : 'Incorrect Password'});
        }

        const token = jwt.sign({id : user._id} , 'passwordkey');
        res.json({token , ...user._doc});

    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
});

module.exports = loginRouter;