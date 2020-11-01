const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('MongoDB Connected!')})
    .catch(err => { console.log(err) });

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