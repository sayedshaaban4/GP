const mongoose = require("mongoose");
const User = require("./user");
const { Timestamp } = require("mongodb");

const ReportSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    userName: {
        required: true,
        trim: true,
        type: String,
    },
    phone: {
        required: true,
        trim: true,
        type: String,
    },
    licence: {
        required: true,
        trim: true,
        type: String,
    },
    model_1: {
        required: true,
        type: Number,
    },
    model_2: {
        required: true,
        type: Number,
    },
    model_3: {
        required: true,
        type: Number,
    },
    total: {
        required: true,
        type: Number,
    },
    date: {
        required: true,
        type: String,
    },
    time: {
        required: true,
        type: String,
    },
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
