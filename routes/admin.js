const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Product = require('../models/product');
const {isLoggedIn, isAuthor, isAdminLoggedIn} = require('../utils/middleware');
const user = require('../models/user');

router.get('/admin', isAdminLoggedIn, async (req, res) => {
  const users = await User.find({});
  const products = await Product.find({});
  let customerCount = 0;
  let dealerCount = 0;
  let adminCount = 0;
  let mobileCount = 0;
  let laptopCount = 0;
  let watchCount = 0;

  for(let i = 0; i < users.length; i++) {
    if(users[i].profile == 'dealer')
      dealerCount++;
    else if(users[i].profile == 'customer')
      customerCount++;
    else
      adminCount++;
  }

  for(let i = 0; i < products.length; i++) {
    if(products[i].category == 'Mobile')
      mobileCount++;
    else if(products[i].category == 'Laptop')
      laptopCount++;
    else
      watchCount++;
  }

  res.render('admin/dashboard', {users, products, customerCount, dealerCount, adminCount, mobileCount, laptopCount, watchCount});
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

//SHOW
router.get('/admin/users/:id', async(req, res)=>{
  const user = await User.findById(req.params.id);
  res.render('users/show', {user});
});

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