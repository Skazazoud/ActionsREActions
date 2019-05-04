//const apiRoutes = require('./controllers/api');
const jwt = require('jsonwebtoken');
    bcrypt = require('bcrypt-nodejs');
    User = require('./models/user');
    fs = require('fs');
    crypto = require('crypto');
    mail = require('nodemailer');


const jwtVerifyMiddleware = (req, res, next) => {
    // check for token in the header first, then if not provided, it checks whether it's supplied in the body of the request
    var token = req.headers['x-access-token'] || req.body.token;
    if (token) {
        jwt.verify(token, token_secret, function(err, decoded) {
            if (!err) {
                req.decoded = decoded; // this add the decoded payload to the client req (request) object and make it available in the routes
                next();
            } else {
                res.status(403).send('Invalid token supplied');
            }
        });
    } else {
        res.status(403).send('Authorization failed! Please provide a valid token');
    }
};

module.exports = function(app, passport, date) {
    const   twilio = require('twilio');
            date = require('date-and-time');

    const accountSid = 'ACa2611f66e0cc9c706012caee07c0bb9d'; // Your Account SID from www.twilio.com/console
        authToken = 'b3d39209f66bfa6db93ff0a53f1d489d'; // Your Auth Token from www.twilio.com/console
        client = new twilio(accountSid, authToken);

    app.get('/about.json', function(req, res) {
        let rawdata = fs.readFileSync('/usr/app/server/about.json');  
            aboutFile = JSON.parse(rawdata);

        aboutFile.server.current_time = Math.floor(Date.now() / 1000);
        res.send(aboutFile);
    });

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index');
    });
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/success', function(req, res) {
        res.render('success');
    });

    // SERVICES PAGE =========================
    function get_services_states(user) {
        var statesArray = {
            tweet2MailState: user.twitter.triggers.tweet2Mail,
            msg2MailState: user.twitter.triggers.msg2Mail,
            follow2MailState: user.twitter.triggers.follow2Mail,
            wake2SMSState: user.timer.triggers.wake2SMS,
            mum2SMSState: user.timer.triggers.mum2SMS,
            cat2SMSState: user.timer.triggers.cat2SMS,
            follow2SMSState: user.twitter.triggers.follow2SMS,
            msg2SMSState: user.twitter.triggers.msg2SMS,
        };
        keys = Object.keys(statesArray);
        resultArray = {
            tweet2MailState: "",
            msg2MailState: "",
            follow2MailState: "",
            wake2SMSState: "",
            mum2SMSState: "",
            cat2SMSState: "",
            follow2SMSState: "",
            msg2SMSState: "",
            userData: user
        };

        for (i = 0; i < keys.length; i++) {
            if (statesArray[keys[i]] == true)
                resultArray[keys[i]] = "checked";
            else
                resultArray[keys[i]] = "";
        }
        return resultArray;
    }

    app.get('/services', isLoggedIn, function(req, res) {
        var statesArray = get_services_states(req.user);
        res.render('services', statesArray);
    });

    app.get('/services/:triggerName', function(req, res) {
        var user = req.user;

        switch (req.params.triggerName) {
            case "tweetMail":
                user.twitter.triggers.tweet2Mail = !user.twitter.triggers.tweet2Mail;
                user.save();
                break;
            case "msg2Mail":
                user.twitter.triggers.msg2Mail = !user.twitter.triggers.msg2Mail;
                user.save();
                break;
            case "follow2Mail":
                user.twitter.triggers.follow2Mail = !user.twitter.triggers.follow2Mail;
                user.save();
                break;
            case "wake2SMS":
                user.timer.triggers.wake2SMS = !user.timer.triggers.wake2SMS;
                user.save();
                break;
            case "mum2SMS":
                user.timer.triggers.mum2SMS = !user.timer.triggers.mum2SMS;
                user.save();
                break;
            case "cat2SMS":
                user.timer.triggers.cat2SMS = !user.timer.triggers.cat2SMS;
                user.save();
                break;
            case "follow2SMS":
                user.twitter.triggers.follow2SMS = !user.twitter.triggers.follow2SMS;
                user.save();
                break;
            case "msg2SMS":
                user.twitter.triggers.msg2SMS = !user.twitter.triggers.msg2SMS;
                user.save();
                break;
        }
        var statesArray = get_services_states(user);
        res.render('services', statesArray);
    });
    app.get('/actions', isLoggedIn, function(req, res) {
        res.render('actions')
    })
    app.post('/actions', function(req, res) {
        var input = req.body.action;
        var phone = req.user.local.phone;
        var email = req.user.local.email;
        if (input == "cat2SMS") {
            client.messages
       			.create({
        			body: 'Feed the bloody animals you fool',
        			from: '+33644602808',
        			to: phone
				})
			.then(message => console.log(message.sid));
        }
        else if (input == "mum2SMS") {
            client.messages
       			.create({
        			body: 'Call mum !',
        			from: '+33644602808',
					to: phone
        		})
        	.then(message => console.log(message.sid));
        }
        else if (input == "wake2SMS") {
            client.messages
       			.create({
        			body: 'Wake up Neo',
        			from: '+33644602808',
        			to: phone
        		})
        	.then(message => console.log(message.sid));
        }
        else if (input == "follow2SMS") {
            client.messages
       			.create({
        			body: 'You have a new twitter follower!',
        			from: '+33644602808',
        			to: phone
        		})
        	.then(message => console.log(message.sid));
        }
        else if (input == "msg2SMS") {
            client.messages
       			.create({
        			body: 'You have a new twitter Private Message!',
     				from: '+33644602808',
        			to: phone
        		})
        	.then(message => console.log(message.sid));
        }
        else if (input == "msg2Mail") {
            var subject = "New Twitter Private Message !";
            var content = "<p>New twitter private message !</p>"
            EMAIL(subject, content, email)
        }
        else if (input == "tweet2Mail") {
            var subject = "New Twitter Mention !";
            var content = "<p>New twitter mention !</p>"
            EMAIL(subject, content, email)
        }
        else if (input == "follow2Mail") {
            var subject = "New Twitter Follower !";
            var content = "<p>New twitter follower !</p>"
            EMAIL(subject, content, email)
        }
        res.redirect('/actions')
    })
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {

        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    );
    app.get('/auth/twilio', function(req, res) {
        var user = req.user;
        user.twilio.state = true;
        user.save(function(err) {
            res.redirect('/profile');
        })
    })
    app.get('/auth/timer', function(req, res) {
        var user = req.user;
        user.timer.state = true;
        user.save(function(err) {
            res.redirect('/profile');
        })
    })
    app.get('/auth/nodemailer', function(req, res) {
        var user = req.user;
        user.nodemailer.state = true;
        user.save(function(err) {
            res.redirect('/profile');
        })
    })

    app.get('/unlink/twilio', function(req, res) {
        var user = req.user;
        user.twilio.state = false;
        user.save(function(err) {
            res.redirect('/profile');
        })
    })
    app.get('/unlink/timer', function(req, res) {
        var user = req.user;
        user.timer.state = false;
        user.save(function(err) {
            res.redirect('/profile');
        })
    })
    app.get('/unlink/nodemailer', function(req, res) {
        var user = req.user;
        user.nodemailer.state = false;
        user.save(function(err) {
            res.redirect('/profile');
        })
    })

    app.post('/profile', function(req, res) {
        res.redirect('/profile');
    });
    app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
        // The request will be redirected to spotify for authentication, so this
        // function will not be called.

    });

    app.get(
        '/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/profile'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            var url = req.url;
            res.redirect('/');
        }
    );
    app.get('/connect/local', function(req, res) {
        res.render('connect-local', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =============================================================================
    // AUTHORIZE (LINK LOCAL ACCOUNT TO EXTERNAL SERVICES) =========================
    // =============================================================================

    app.get('/connect/twitter', passport.authorize('twitter', {
        scope: 'email'
    }));

    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    app.get('/unlink/twitter', function(req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.twitter.tokenSecret= undefined;
        user.twitter.connected = false;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
    // =============================================================================
    // SERVER'S API ================================================================
    // =============================================================================
    let token_secret = 'iy98hcbh489n38984y4h498';

    app.get('/api/home', (req, res) => {
        res.send('Welcome to the Home of our APP');
    })

    app.post('/api/signup', (req, res) => {
        User.findOne({
            'local.email': req.body.email
        }, (err, userData) => {
            if (!userData) {
                console.log(req.body)
                var newUser = new User();
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.phone = req.body.phone;
                newUser.save(function(error) {
                    if (!error) {
                        return res.status(201).json('signup successful');
                    } else {
                        console.log(JSON.stringify(error, null, 2));
                        // you might want to do this to examine and trace where the problem is emanating from
                        return res.status(500).send('error signing up user');
                    }
                })
            } else {
                return res.status(409).send('user already exist');
            }
        })
    })

    app.post('/api/login', (req, res) => {
        User.findOne({
            'local.email': req.body.email
        }, (err, userData) => {
            if (err || !userData) {
                res.status(401).send('cannot find user');
            } else {
                if (userData.validPassword(req.body.password)) {
                    // payload contains data we want client to hold for when next they send us any request
                    const payload = {
                        email: userData.email,
                        id: userData._id,
                    }
                    let token = jwt.sign(payload, token_secret);
                    console.log(token)
                    //  send the token and some other info we feel clients might need to them in form of response
                    res.status(200).send({
                        token,
                        email: userData.email
                    })
                } else {
                    res.status(401).send('Password invalid');
                }
            }
        })
    });

    app.get('/protected', (req, res) => {
        res.send(`You have access to this because you have supplied a valid token.
                Your username is ${req.decoded.username}
                and email is ${req.decoded.email}.
            `)
    });

    // =============================================================================
    // WEBHOOKS ====================================================================
    // =============================================================================
    app.get('/webhooks/twitter', (req, res) => {
        response_token = "sha256=" + crypto.createHmac('sha256', "bsXBPBZ29X8Zcdk4rtt6J3Jg7tHBCRbtcksXhLSuv70Fp5VxW2").update(req.query.crc_token).digest('base64');
        console.log("response token: " + response_token);
        res.status(200).json({"response_token": response_token});
    });
    app.post('/webhooks/twitter', (req, res) => {
        console.log(req.body);
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
async function EMAIL(subject, content, email){
    // create reusable transporter object using the default SMTP transport
    let transporter = mail.createTransport({
        service: 'gmail',
        auth: {
            user: 'area.epitech.test@gmail.com',
            pass: '123456789bite'
        }
    });
  
    const mailOptions = {
        from: 'area.epitech.test@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: content// plain text body
      };
  
    transporter.sendMail(mailOptions, function (err, info) {})
  }