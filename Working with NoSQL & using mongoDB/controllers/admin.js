const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {

};

exports.getEditProduct = (req, res, next) => {

};

exports.postEditProduct = (req, res, next) => {

};

exports.getProducts = (req, res, next) => {

};

exports.postDeleteProduct = (req, res, next) => {

};
