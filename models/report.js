const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
    id : {
        type: Number,
    },

    userName : {
        required: true,
        trim: true,
        type: String,
    },

    phone : {
        required: true,
        trim: true,
        type: String,
    },

    licence : {
        required: true,
        trim: true,
        type: String,
    },
    drowsinessRate : {
        required: true,
        type: Number,
    },

    distructionRate : {
        required: true,
        type: Number,
    },

    total : {
        type: Number,
        default : 0,
    },

    date : {
        required: true,
        type: String,
    },

    time : {
        required: true,
        type: String,
    },

    source : {
        required: true,
        type: String,
    },

    destination : {
        required: true,
        type: String,
    },

});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;