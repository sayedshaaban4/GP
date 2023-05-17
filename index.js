// Imporst From Packeges
const express = require('express');
const mongoose = require('mongoose');

// Imports From Other Files
    // Admin
const adminSignupRouter = require('./apis/admin/signup');
const adminLoginRouter = require('./apis/admin/login');
const getAllDrivers = require('./apis/admin/getalldrivers');
const getAllReports = require('./apis/admin/getallreports');
    // Driver
const driverLoginRouter = require('./apis/driver/login');
const addReport = require('./apis/driver/addreport');
const getData = require('./apis/driver/getdata');
const updateData = require('./apis/driver/update');


// Init
const app = express();
const PORT = process.env.PORT || 5000;
const DB = "mongodb+srv://sayed_4:sayed_4@cluster0.majlbku.mongodb.net/?retryWrites=true&w=majority";


// MiddleWare
app.use(express.json());
    // Admin
app.use(adminSignupRouter);
app.use(adminLoginRouter);
app.use(getAllDrivers);
app.use(getAllReports);
    // Driver
app.use(driverLoginRouter);
app.use(addReport);
app.use(getData);
app.use(updateData);


// Connections
mongoose.connect(DB).then(()=>{
    console.log("Connection to DataBase Succssfully");
}).catch((e) => {
    console.log(e);
});


app.get('/' , (req ,res) =>{
    res.json({first : "Welcome to the first Page :D "});
})

app.listen(PORT,() =>{
    console.log(`Connected at Port ${PORT}`);
});
