const express = require('express');
const router = express.Router();

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
        res.send("pass");
    }
})

module.exports = router;
