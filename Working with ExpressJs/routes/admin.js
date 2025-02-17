const express = require('express');

const router = express.Router();

router.get('/add_product', (req, res)=>{
    res.send(`
            <form action="/product" method="POST">
                <input type="text" name="title">
                <button type="submit">Add Product</button>
            </form>
    `);
})

router.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
})


module.exports = router;