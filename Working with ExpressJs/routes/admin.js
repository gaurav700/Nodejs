const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');


router.get('/add_product', (req, res)=>{
    res.sendFile(path.join(rootDir , 'views', 'add-product.html'))
})

router.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
})


module.exports = router;