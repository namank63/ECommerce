module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdminLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/admin/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product.dealer.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/products/${id}`);
    }
    next();
}