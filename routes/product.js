const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor} = require('../utils/middleware');
const Product = require('../models/product');
const User = require('../models/user');

//Index    /products    GET
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
});

//New    /product/new    GET
router.get('/product/new', (req, res)=>{
    res.render('products/new');
});


//Create    /products    POST
router.post('/products', isLoggedIn, catchAsync (async(req, res)=>{
    const id = req.user._id;
    const dealer = await User.findById(id);
    const { name, price, description, brand, model, units, image, location, tags, category } = req.body;
    const product = new Product({
        name, price, description, brand, model, units, image, location, dealer, tags, category
    });
    await dealer.items.push(product);
    await product.save();
    await dealer.save();
    res.redirect('/dealer');
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
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    req.flash('success', 'Successfully updated product!');
    res.redirect(`/dealer`);
}));


//Delete    /products/:id    DELETE
router.delete('/products/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const dealer = await User.findById(req.user._id);
    const index = dealer.items.indexOf(id);
    if (index !== -1)
        dealer.items.splice(index, 1);
    await dealer.save();
    const product = await Product.findById(id);
    for(let i = 0; i < product.incart.length; i++) {
        let user = await User.findById(product.incart[i]);
        await user.cart.pull(id);
        await user.save();
    }
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted product');
    res.redirect('/dealer');
}));


//Category Wise List
router.get('/products/category/:category', async(req, res)=>{
    const products = await Product.find({'category': req.params.category});
    const productCat = req.params.category;
    res.render('products/category', {products, productCat});
});

router.post('/product/search', async(req, res)=>{
    const tag = req.body.tag;
    const allProducts = await Product.find({});
    let products = [];
    for(let i = 0; i < allProducts.length; i++) {
        if(tag.length > 0 && allProducts[i].tags.includes(tag)) {
            products.push(allProducts[i]);
        }
    }
    res.render('products/search', {products});
});

module.exports = router;