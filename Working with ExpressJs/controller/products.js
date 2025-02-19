const rootDir = require('../util/path');
const adminData = require('../routes/admin');
const path = require('path');
const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir , 'views', 'add-product.html'))
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        activeProduct : true, 
        formsCss : true, 
        productCss : true})
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    // res.sendFile(path.join(rootDir , 'views', 'shop.html'))
    res.redirect('/');
};

exports.getHomePage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop', 
        path: '/', 
        hasProd : products.length > 0, 
        activeShop : true, 
        productCss : true});
};