const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');

// User model needs to be imported
const User = require('../models/User');


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));


router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    // check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields!' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match!' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at at least 6 characters long!' });
    } 

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email
        });
    } else {
        // Data validation
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email already registered!' });
                    res.render('register', {
                        errors,
                        name,
                        email
                    });
                } else {
                    // Create new user!
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash password using bcryptjs
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // set and save password
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered!');
                                    res.redirect('/users/login');
                                })
                                .catch(err => { console.log(err); });
                        });
                    });
                }
            })
            .catch(err => { console.log(err); });
    }
})
// Handle the post request to the login page
// Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out!')
    res.redirect('/users/login');
})

module.exports = router;
