const cron = require('node-cron');
    twitterTriggers = require("./twitter-triggers.js");
    timerTriggers = require('./timer-triggers.js');
    twitterHooks = require('../../server.js');
    User = require('../models/user.js');
    date = require('date-and-time');
    mail = require('nodemailer');
    Twit = require('twit'); 
    var T = new Twit({
      consumer_key:         '',
      consumer_secret:      '',
      access_token:         '',
      access_token_secret:  '',
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
      strictSSL:            true,     // optional - requires SSL certificates to be valid.
    })
    async function EMAIL(content, title){
        // create reusable transporter object using the default SMTP transport
        let transporter = mail.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: '123456789bite'
            }
        });
      
        const mailOptions = {
            from: '', // sender address
            to: '', // list of receivers
            subject: title, // Subject line
            html: content// plain text body
          };
      
        transporter.sendMail(mailOptions, function (err, info) {})
      }
    async function GET_TWILIO() {
        const timerUsers = await User.find({ timer: { state:  true} } , function(err) {
            if (err) {
                return done(err);
            }
        })
        timerUsers.forEach(function(user) {
            console.log(user.local.email)
        }).then(function (findState) {
            findState
        });
    }
    async function GET_TIMER() {
        const twilioUsers = await User.find({ twilio: { state:  true} } , function(err) {
            if (err) {
                return done(err);
            }
        })
        twilioUsers.forEach(function(user) {
            return (user.local.email)
        }).then(function () {
            
        });
    }
    async function GET_TWEET() {
        T.get('followers/ids', { screen_name: '' },  function (err, data, response) {
            return (data)
          })
    }



module.exports = {
    init: async function() {
        const twitterUsers = await User.find({ twitter: { token: { $ne: undefined } } }, function(err){
            if (err) {
                return done(err);
            }
        });
        twitterUsers.forEach(function(user) {
            twitterHooks.subscribe({
                userId: user.twitter.id,
                accessToken: user.twitter.token,
                accessTokenSecret: ''
            }).then(function (userActivity) {
                userActivity
                .on('tweet_create', (data) => twitterTriggers.tweet_trigger(user, data))
                .on('follow', (data) => twitterTriggers.follow_trigger(user, data))
                .on('direct_message', (data) => twitterTriggers.message_trigger(user, data))
            });
        });
        // Every minute, update the different triggers by launching the services' triggers scripts
        cron.schedule('*/1 * * * *', function(){
            let now = new Date();
            d_a_t_e = date.format(now, 'h:m A'); 
            console.log(d_a_t_e);
            console.log("Running cron jobs");
            diff = GET_TWEET()
            test = diff
            if (d_a_t_e === "9:0 a.m.") {
                client.messages
                          .create({
                                body: 'Wake up Neo',
                                from: '+33644602808',
                                to: '+'
                          })
                      .then(message => console.log(message.sid));
                var content = "<p>Wake up Neo<p>";
                var title = "WAKE UP !"
                EMAIL(content, title)
            }
            if (d_a_t_e === "6:0 p.m.") {
                client.messages
                          .create({
                               body: 'Feed the bloody animals you fool',
                               from: '+33644602808',
                               to: '+'
                           })
                       .then(message => console.log(message.sid));
                var content = "<p>Cat cat cat cat cat cat cat<p>";
                var title = "THE CATS NEED FEEDING!"
                EMAIL(content, title)
            }
            if (d_a_t_e === "8:0 p.m.") {
                client.messages
                           .create({
                                body: 'Call ur mum idiot',
                                from: '+33644602808',
                                to: '+'
                             })
                        .then(message => console.log(message.sid));
                var content = "<p>Your mother is worrying about you u better give her a call<p>";
                var title = "MISSED CALL FROM MUM!"
                EMAIL(content, title)
            }
        });
    }
};