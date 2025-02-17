const express = require('express');
const app = express();

app.use((req,res, next)=>{
    console.log("middleware");
    next();
})


app.get("/", (req, res)=>{
    res.send("hello world");
})
app.listen(3000);