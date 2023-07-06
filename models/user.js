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
                return value.length === 0;
            },
            message: 'The Password length should be greater than zero',
        },
    },

    email : {
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

    phone : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                return value.length === 11;
            },
            message: 'your Phone is invalid!',
        },
    },

    licence : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                return value.length === 1;
            },
            message: 'your licence is invalid!',
        },
    },

    nationalId : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                return value.length === 14;
            },
            message: 'your National ID is invalid!',
        },
    },

    governorate : {
        required : true,
        trim : true,
        type : String,
    },

    reportsValue : {
        type : Number,
        default : 0,
    },

    reportsCount : {
        type : Number,
        default : 0,
    },

    avgScore : {
        type : Number,
        default : 0,
    },

    type : {
        type : String,
        default : 'Driver',
    },
});

const User = mongoose.model("User" , UserSchema);
module.exports = User;