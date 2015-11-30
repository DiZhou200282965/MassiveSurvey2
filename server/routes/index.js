var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var User = require('../models/user');



// GET about page
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About',
        displayName: req.user ? req.user.displayName : ''
    });
});



// GET services page
router.get('/services', function (req, res, next) {
    res.render('services', {
        title: 'Services',
        displayName: req.user ? req.user.displayName : ''
    });
})


/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');//redirect to home page if logged in
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', //redirect after login success
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to home Page / Fail go to Signup page
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));


/* Process Logout Request */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
