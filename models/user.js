const mongoose = require('mongoose');

const uuserSchema = mongoose.Schema({
    name : {
        required : true,
        trim : true,
        type : String,
    },
    email : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                const RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return value.match(RE);
            },
            message : "Please Enter a valid Email",
        },
    },
    phone : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                const RE = /^\d{11}$/;
                return value.match(RE);
            },
            message : "Please Enter a valid Phone Number",
        },
    },
    //TO BE DONE
    licence : {
        required : true,
        trim : true,
        type : String,
    },
    NationalID : {
        required : true,
        trim : true,
        type : String,
        validate : {
            validator : (value) => {
                const RE = /^\d{14}$/;
                return value.match(RE);
            },
            message : "Please Enter a valid National ID",
        },
    },
    Password : {
        required : true,
        type : String,
    },
});

const user = mongoose.model("user" , uuserSchema);

module.exports = user;
