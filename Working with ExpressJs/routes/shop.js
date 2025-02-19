const express = require('express');
const { getHomePage } = require('../controller/products');

const router = express.Router();

router.get('/', getHomePage);

module.exports = router;
