const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Product = require('../models/product');
const {isLoggedIn, isAuthor, isAdminLoggedIn} = require('../utils/middleware');

router.get('/admin', isAdminLoggedIn, async (req, res) => {
  res.render('admin/dashboard');
});

router.get('/admin/users', isAdminLoggedIn, async (req, res) => {
  const users = await User.find({});
  res.render('admin/users', {users});
});

router.get('/admin/products', isAdminLoggedIn, async (req, res) => {
  const products = await Product.find({});
  res.render('admin/products', {products});
});

router.get('/admin/register', (req, res) => {
  res.render('admin/register');
});

router.post('/admin/register', catchAsync(async (req, res, next) => {
  try {
      const { uniquekey, email, username, createpassword, profile } = req.body;
      const user = new User({ uniquekey, email, username, profile });
      const registeredUser = await User.register(user, createpassword);
      req.login(registeredUser, err => {
          if (err) return next(err);
          req.flash('success', 'Welcome to ECommerce Lab!');
          res.redirect('/admin');
      })
  } catch (e) {
      req.flash('error', e.message);
      res.redirect('admin/register');
  }
}));

router.get('/admin/login', (req, res) => {
  res.render('admin/login');
})

router.post('/admin/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login' }), (req, res) => {
  req.flash('success', "Logged in Successfully, Welcome!!");
  const redirectUrl = req.session.returnTo || '/admin';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
})

router.get('/admin/logout', (req, res) => {
  req.logout();
  req.flash('success', "Logged out Successfully, Goodbye!!");
  res.render('admin/login');
})

// //SHOW
// router.get('/users/:id', async(req, res)=>{
//   const user = await User.findById(req.user._id);
//   res.render('users/show', {user});
// });

// //EDIT
// router.get('/users/:id/edit', async(req, res)=>{
//   const user = await User.findById(req.user._id);
//   res.render('users/edit', {user});
// });

// //UPDATE
// router.put('/users/:id', catchAsync(async (req, res) => {
//   const id = req.user._id;
//   const user = await User.findByIdAndUpdate(id, { ...req.body.user });
//   req.flash('success', 'Account Updated Successfully!');
//   res.redirect(`/users/${id}`);
// }));

module.exports = router;