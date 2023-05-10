const express = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getAllRouter = express.Router();

getAllRouter.get('/api/admin/getalldrivers' , async (req , res) => {
    try{
        const result = await User.find({type : 'Driver'},{_id : 0 , password : 0 , type : 0 , __v : 0});
        res.send(result);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = getAllRouter;