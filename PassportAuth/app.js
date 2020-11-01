const express = require('express');
const expressLaouts = require('express-ejs-layouts');

const app = express();

// EJS startup
app.use(expressLayouts);
app.set('view engine', 'ejs');

/** Routes
 * Kind of like flask in python! But instead of using decorators you use function calls to use. 
 */ 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));