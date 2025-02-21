const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

};

exports.getProduct = (req, res, next) => {

};

exports.getIndex = (req, res, next) => {

};

exports.getCart = (req, res, next) => {

};

exports.postCart = (req, res, next) => {

};

exports.postCartDeleteProduct = (req, res, next) => {

};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
