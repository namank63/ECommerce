const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product');
const User = require('../models/user');

/*
index:    GET:         /
New:      GET:         /product/new
Create:   POST:        /products
show:     GET:         /products/:id
Edit:     Get:         /products/:id/edit
update:   POST:        /products/:id
delete:   POST:        /products/:id
*/

//New    GET    /product/new
router.get('/product/new', catchAsync (async (req, res) => {
    res.render('products/new');
}));

//show    GET    /products/:id
router.get('/products/:id', catchAsync (async (req, res) => {
    res.render('products/show');
}));

// Edit    Get    /products/:id/edit
router.get('/products/:id/edit', catchAsync (async (req, res) => {
    res.render('products/edit');
}));

// Create    POST    /products
router.post('/products', catchAsync (async (req, res) => {
    const { name, price, brand, model, category, description, image, units, tags } = req.body;
    const tagArray = tags.split(' ');
    const user = await User.findById('615f356a859bf6d82fb8c79d');

    const product = new Product({
        name: name,
        price: price,
        brand: brand,
        model: model,
        category: category,
        description: description,
        image: image,
        units: units,
        dealer: user,
        tags: tagArray
    });

    console.log(product);
    res.send('see console!');


    
    // let date = new Date();
    // let num = date.getTime();

    // const user = await User.findById('615f356a859bf6d82fb8c79d');
    // const product = new Product({
    //     name: `Product_${num}_name`,
    //     price: num,
    //     brand: `Product_${num}_brand`,
    //     model: `Product_${num}_model`,
    //     category: `Product_${num}_category`,
    //     description: `Product_${num}_description`,
    //     image: `Product_${num}_image`,
    //     units: num,
    //     dealer: user,
    //     tags: [
    //         `Product_${num}_tag1`,
    //         `Product_${num}_tag2`
    //     ]
    // });
    // await product.save();
    // res.send(product);
}));


module.exports = router;