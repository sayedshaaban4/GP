const express = require('express');
const User = require('../../models/user');
const token = require('../middlewares/token');
const myProfileRouter = express.Router();

myProfileRouter.get('/api/driver/my-profile' , token , async (req , res) => {
    try{
        const user = await User.findById(req.user);
        const profileInfo = await User.find( {userName : user.userName} , 
                                    {_id : 0 , password : 0 , type : 0 , __v : 0 , reportsValue : 0 , reportsCount : 0});
        res.json({profileInfo});
    }catch (e) {
        res.status(500).json({error: e}) ;
    }
});

module.exports = myProfileRouter;