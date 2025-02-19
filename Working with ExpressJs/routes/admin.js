const express = require('express');
const { getAddProduct, postAddProduct, getProducts } = require('../controller/admin');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/products', getProducts);

exports.routes = router;

