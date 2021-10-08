const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor} = require('../utils/middleware');
const Product = require('../models/product');

//Index    /products    GET
router.get('/products', (req, res)=>{
    res.redirect('/');
});


//New    /product/new    GET
router.get('/product/new', (req, res)=>{
    res.render('products/new');
});


//Create    /products    POST
router.post('/products', catchAsync (async(req, res)=>{
    const { name, price, description, brand, model, units, image, location, tags, category } = req.body;
    const product = new Product({
        name, price, description, brand, model, units, image, location, tags, category
    });

    await product.save();
    res.send(product);
}));


//Show    /products/:id    GET
router.get('/products/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product })
});


//Edit    /products/:id/edit    GET
router.get('/products/:id/edit', async (req, res)=>{
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
});


//Update    /products/:id    PUT
router.put('/products/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    console.log(product);
    req.flash('success', 'Successfully updated product!');
    res.redirect(`/products/${product._id}`);
}));


//Delete    /products/:id    DELETE
router.delete('/products/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/products');
}));


module.exports = router;