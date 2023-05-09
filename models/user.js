const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName : {
        required : true,
        trim : true,   
        type : String,
    },   
    password : {
        required : true,
        type : String,
        validate : {
            validator : (value) => {
                return value.length >= 8;
            },
            message: 'your Password is short!',
        },
    },
    email :{
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;    
            return value.match(re);
            },
            message: 'your Email is invalid!',
        },
    },
    phone: {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                return value.length === 11;
            },
            message: 'your National is invalid!',
        },
    },
    licence : {
        required : true,
        trim : true,
        type : String,

    },
    nationalId : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                return value.length === 14;
            },
            message: 'your National is invalid!',
        },
    },
    governorate : {
        required : true,
        trim : true,
        type : String,
    },
    type : {
        type : String,
        default : 'Driver',
    },
});

const User = mongoose.model("User" , UserSchema);

module.exports = User;
