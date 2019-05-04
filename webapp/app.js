const express = require('express');
const path = require('path');
const createError = require('http-errors')
const port = process.env.PORT || 8081;
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

require('./routes/routes.js')(app)
app.listen(port)