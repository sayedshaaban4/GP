// Imporst From Packeges
const express = require('express');
const mongoose = require('mongoose');

// Imports From Other Files
    // Admin
const addNewDriverRouter = require('./apis/admin/addNewDriver');
const adminLoginRouter = require('./apis/admin/login');
const allDriversRouter = require('./apis/admin/allDrivers');
const allReportsRouter = require('./apis/admin/allReports');

    // Driver
const driverLoginRouter = require('./apis/driver/login');
const tripReportRouter = require('./apis/driver/tripReport');
const myProfileRouter = require('./apis/driver/myProfile');
const updateInfoRouter = require('./apis/driver/updateInfo');
const myReportsRouter = require('./apis/driver/myreports');

// Inits
const app = express();
const PORT = process.env.PORT || 5000;
const DB = "mongodb+srv://sayed_4:sayed_4@cluster0.majlbku.mongodb.net/?retryWrites=true&w=majority";


// MiddleWare
app.use(express.json());
    // Admin
app.use(addNewDriverRouter);
app.use(adminLoginRouter);
app.use(allDriversRouter);
app.use(allReportsRouter);

    // Driver
app.use(driverLoginRouter);
app.use(tripReportRouter);
app.use(myProfileRouter);
app.use(updateInfoRouter);
app.use(myReportsRouter);


// Connections
    // Data Base
mongoose.connect(DB).then(()=>{
    console.log("Connection to DataBase Succssfully");
}).catch((e) => {
    console.log(e);
});
    // Port
app.listen(PORT,() =>{
    console.log(`Connected at Port ${PORT}`);
});

// Home Page
app.get('/' , (req ,res) =>{
    res.json({Home : "Welcome to our project"});
})