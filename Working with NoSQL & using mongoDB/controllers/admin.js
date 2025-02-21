const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
  .then(result => {
    console.log(result);
    res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getEditProduct = (req, res, next) => {

};

exports.postEditProduct = (req, res, next) => {

};

exports.getProducts = (req, res, next) => {

};

exports.postDeleteProduct = (req, res, next) => {

};
