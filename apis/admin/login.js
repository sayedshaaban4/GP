const express = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminLoginRouter = express.Router();

adminLoginRouter.post('/api/admin/login' , async (req , res) => {
    try{
        const {userName , password} = req.body;

        const user = await User.findOne({userName});

        if(!user){
            return res.status(400).json({msg : 'Wrong userName'});
        }

        const isMatchPassword = await bcryptjs.compare(password , user.password);

        if(!isMatchPassword){
            return res.status(400).json({msg : 'Incorrect Password'});
        }

        if(user.type === 'Driver'){
            return res.status(400).json({msg : 'Invalid login Access'});
        }

        const token = jwt.sign({id : user._id} , 'passwordkey');
        res.json({token , ...user._doc});

    } catch (e) {
        res.status(500).json({msg: e.message});
    }
});

module.exports = adminLoginRouter;