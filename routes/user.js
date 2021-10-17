const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Product = require('../models/product');
const {isLoggedIn, isAuthor} = require('../utils/middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const cartItemCount = 0;
        const { email, username, createpassword, profile } = req.body;
        const user = new User({ email, username, profile, cartItemCount });
        const registeredUser = await User.register(user, createpassword);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to ECommerce Lab!');
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', "Logged in Successfully, Welcome!!");
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Logged out Successfully, Goodbye!!");
    res.redirect('/');
})

//SHOW
router.get('/users/:id', async(req, res)=>{
    const user = await User.findById(req.user._id);
    res.render('users/show', {user});
});

//EDIT
router.get('/users/:id/edit', async(req, res)=>{
    const user = await User.findById(req.user._id);
    res.render('users/edit', {user});
});

//UPDATE
router.put('/users/:id', catchAsync(async (req, res) => {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user });
    req.flash('success', 'Account Updated Successfully!');
    res.redirect(`/users/${id}`);
}));


//CART
//Index
router.get('/user/:id/cart', async(req, res)=>{
    const user = await User.findById(req.params.id);
    const cart = user.cart;
    const array = [];

    for(let i = 0; i < cart.length; i++) {
        let product = await Product.findById(cart[i]);
        array.push(product);
    }

    const products = [...new Set(array)];
    res.render('cart/index', {products});
});


//Add
router.post('/user/:id/cart', isLoggedIn, async(req, res)=>{
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);
    let toAdd = true;

    for(let i = 0; i < user.cart.length; i++) {
        if(user.cart[i]._id.toString() === req.params.id)
            toAdd = false;
    }

    if(toAdd) {
        await user.cartItemCount++;
        await user.cart.push(product);
        await product.customers.push(user);
        await user.save();
        await product.save();
    }

    req.flash('success', 'Item Added Successfully!');
    res.redirect('/');
    // res.status(204).send();

});

module.exports = router;