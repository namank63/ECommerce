const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor} = require('../utils/middleware');
const Product = require('../models/product');
const User = require('../models/user');

router.get('/dealer', isLoggedIn, async (req, res)=> {
  const id = req.user._id;
  const dealer = await User.findById(id);
  const items = dealer.items;
  const products = [];
  
  for(let i = 0; i < items.length; i++) {
    let product = await Product.findById(items[i]);
    products.push(product);
  }

  res.render('dealer/dashboard', {products});
});

module.exports = router;