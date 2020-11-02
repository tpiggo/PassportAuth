// Imported 
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const express_session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('MongoDB Connected!')})
    .catch(err => { console.log(err) });

// Body Parser
app.use(express.urlencoded({ extended: false }));


// Express Session
app.use(express_session({
    secret: 'keyboardDoggo',
    resave: true,
    saveUninitialized: true
}));

// Import passport
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global vars
// Custom middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    // Have to use error as the message is stored in error by the passport object.
    res.locals.login_error = req.flash('error');
    next();
})

// EJS startup
app.use(expressLayouts);
app.set('view engine', 'ejs');

/** Routes
 * Kind of like flask in python! But instead of using decorators you use function calls to use. 
 */ 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));