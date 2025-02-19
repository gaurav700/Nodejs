const express = require('express');
const { getProducts, getIndex, getCart, getCheckout } = require('../controller/shop');

const router = express.Router();


router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/cart', getCart);

router.get('/checkout', getCheckout);

module.exports = router;
