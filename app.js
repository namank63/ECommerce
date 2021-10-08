//APP VARIABLES
const express = require('express')
const app = express();
const path = require('path');
const DataBaseConnect = require("./database/connection");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/user');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

//CONFIGURATION
DataBaseConnect();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: process.env.SECRET_KEY_FOR_SESSION,
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/', productRoutes);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})