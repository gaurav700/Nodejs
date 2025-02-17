const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded())

app.get("/", (req, res)=>{
    res.send("hello world");
})

app.get('/add_product', (req, res)=>{
    res.send(`
            <form action="/product" method="POST">
                <input type="text" name="title">
                <button type="submit">Add Product</button>
            </form>
    `);
})

app.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
})

app.listen(3000);