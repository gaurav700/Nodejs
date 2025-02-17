const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add_product', (req, res)=>{
    res.sendFile(path.join(__dirname, '../' , 'views', 'add-product.html'))
})

router.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
})


module.exports = router;