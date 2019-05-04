// load up the user model
const User = require('../models/user.js');
    request = require('request');
    mail = require('nodemailer');
    twilio = require('twilio');
    accountSid = '';
    authToken = '';
    client = new twilio(accountSid, authToken); 

let transporter = mail.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '123456789bite'
    }
});
    
function tweet2mail(user, data) {
    transporter.sendMail({
        from: 'AREA App',
        to: user.email,
        subject: "You have a new tweet",
        text: "Here are the informations about your tweet:" + data,
      });
}

function follow2mail(user, data) {
    transporter.sendMail({
        from: 'AREA App',
        to: user.email,
        subject: "You have a new follower",
        text: "Here are the informations about your new follower:" + data,
    });
}

function follow2sms(user, data) {
    client.messages
      	.create({
      		body: 'Hey, you have a new follower on tweeter ! Here some infos about it:' + data,
       		from: '+33644602808',
       		to: user.phone
		})
		.then(message => console.log(message.sid));
}

function msg2mail(user, data) {
    transporter.sendMail({
        from: 'AREA App',
        to: user.email,
        subject: "You have a new follower",
        text: "Here are the informations about your new message:" + data,
    });
}

function msg2sms(user, data) {

}

module.exports = {
    tweet_trigger: function (user, data) {
        console.log(data);
        if (user.twitter.triggers.tweet2Mail === true) {
            tweet2mail(user, data);
        }
    },
    follow_trigger: function (user, data) {
        if (user.twitter.triggers.follow2Mail === true) {
            follow2mail(user, data);
        }
        if (user.twitter.triggers.follow2SMS === true) {
            follow2sms(user, data);
        }
    },
    message_trigger: function (user, data) {
        if (user.twitter.triggers.msg2Mail === true) {
            msg2mail(user, data);
        }
        if (user.twitter.triggers.msg2SMS === true) {
            msg2sms(user, data);
        }
    }
};