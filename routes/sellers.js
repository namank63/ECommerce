const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Seller = require('../models/seller');

router.get('/seller', (req, res) => {
    res.send('SELLER HOME PAGE!');
});

router.get('/seller/register', (req, res) => {
    res.render('sellers/register');
});

router.post('/seller/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, createpassword } = req.body;
        const seller = new Seller({ email, username });
        const registeredSeller = await Seller.register(seller, createpassword);
        req.login(registeredSeller, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to ECommerce Lab!');
            res.redirect('/seller');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/seller/register');
    }
}));

router.get('/seller/login', (req, res) => {
    res.render('sellers/login');
})

router.post('/seller/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/seller/login' }), (req, res) => {
    req.flash('success', "Logged in Successfully, Welcome Seller!!");
    const redirectUrl = req.session.returnTo || '/seller';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', "Logged out Successfully, Goodbye!!");
//     res.redirect('/');
// })

module.exports = router;