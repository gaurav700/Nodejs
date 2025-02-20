const express = require('express');
const { getProducts, getIndex, getCart, getCheckout, getDetails, postCart } = require('../controller/shop');

const router = express.Router();


router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.get('/checkout', getCheckout);

router.get('/products/:id', getDetails);

module.exports = router;
