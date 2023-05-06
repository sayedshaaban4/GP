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
        // validate : {
        //     validator : (value) => {
        //         return value.length > 8;
        //     },
        //     message: 'your password is too short!',
        // },
    },
    type : {
        type : String,
        default : 'Driver',
    },
});

const User = mongoose.model("User" , UserSchema);

module.exports = User;
