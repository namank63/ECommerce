const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, createpassword } = req.body;
        const user = new User({ email, username });
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

module.exports = router;