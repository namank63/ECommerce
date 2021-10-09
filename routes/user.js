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
        const { email, username, createpassword, profile } = req.body;
        const user = new User({ email, username, profile });
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
// router.patch('/users/:id', catchAsync(async (req, res) => {
//     const id = req.user._id;
//     const { profile, email, mobile, address, storeLocation } = req.body;
//     const user = await User.findById(id);

//     user.profile = profile;
//     user.email = email;
//     user.mobile = mobile;
//     user.address = address;
//     user.storeLocation = storeLocation;

//     await user.save();

//     req.flash('success', 'Account Updated Successfully');
//     res.redirect(`/users/${id}`);
// }));

router.put('/users/:id', catchAsync(async (req, res) => {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user });
    req.flash('success', 'Account Updated Successfully!');
    res.redirect(`/users/${id}`);
}));

module.exports = router;