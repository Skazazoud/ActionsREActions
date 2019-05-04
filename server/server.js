// app.js

// set up ======================================================================
// get all the tools we need
const express = require('express');
    path = require('path');
    port = process.env.PORT || 8080;
    mongoose = require('mongoose');
    passport = require('passport');
    flash = require('connect-flash');
    morgan = require('morgan');
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    session = require('express-session');
    user = require('./app/models/user.js');
    configDB = require('./config/database.js');
    date = require('date-and-time');
    cronJobs = require('./app/triggers/cron-jobs.js');
    twitterWebhooks = require('twitter-webhooks');

var app = express();

// configuration ===============================================================
mongoose.connect(configDB.url, {}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, 'views')); // defining ./views as the views folder
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session({
    secret: 'Shhh.. This is (quite) a secret',
    cookie: {
        secure: true
    }
})); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport, date); // load our routes and pass in our app and fully configured passport

// setting Twitter webhooks ====================================================
const twitterHooks = twitterWebhooks.userActivity({
    serverUrl: 'https://filius.serveo.net',
    route: '/webhooks/twitter', //default : '/'
    consumerKey: '',
    consumerSecret: '',
    accessToken: '',
    accessTokenSecret: '',
    environment: 'prod',
    app
});

twitterHooks.register();
module.exports = twitterHooks;

// launch ======================================================================
cronJobs.init();
app.listen(port);
console.log('The magic happens on port ' + port);