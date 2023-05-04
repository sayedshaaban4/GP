// Imporst From Packeges
const express = require('express');
const mongoose = require('mongoose');

// Imports From Other Files
const test = require('./Routes/test');

// Init
const app = express();
const PORT = 5000;
const DB = "mongodb+srv://sayed_4:sayed_4@cluster0.majlbku.mongodb.net/?retryWrites=true&w=majority";


// MiddleWare
app.use(test);


// Connections
mongoose.connect(DB).then(()=>{
    console.log("Connection to DataBase Succssfully");
}).catch((e) => {
    console.log(e);
});


app.get('/first' , (req ,res) =>{
    res.json({first : "Haaaaaaaay"});
})

app.listen(PORT,() =>{
    console.log(`Connected at Porst ${PORT}`);
});
