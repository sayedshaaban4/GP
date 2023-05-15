// Imporst From Packeges
const express = require('express');
const mongoose = require('mongoose');

// Imports From Other Files
const adminSignupRouter = require('./apis/admin/signup');
const adminLoginRouter = require('./apis/admin/login');
const driverLoginRouter = require('./apis/driver/login');
const getAllRouter = require('./apis/admin/getall');
const driverUpdateRouter = require('./apis/admin/update');


// Init
const app = express();
const PORT = process.env.PORT || 5000;
const DB = "mongodb+srv://sayed_4:sayed_4@cluster0.majlbku.mongodb.net/?retryWrites=true&w=majority";


// MiddleWare
app.use(express.json());
app.use(adminSignupRouter);
app.use(adminLoginRouter);
app.use(driverLoginRouter);
app.use(getAllRouter);
app.use(driverUpdateRouter);


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
