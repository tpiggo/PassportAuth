// Imports
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load the User Model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Returns a promise.
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Email not registered!' });
                    }
                    // If the users email worked, we need to find if the password matches.
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password does not match!' })
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );
    // What these do? No idea??!?!?!
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    })
}