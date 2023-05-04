const express = require('express');

const PORT = 5000;

const app = express();

app.get('/first' , (req ,res) =>{
    res.json({first : "Haaaaaaaay"});
})

app.listen(PORT,() =>{
    console.log(`Connected at Porst ${PORT}`);
});
