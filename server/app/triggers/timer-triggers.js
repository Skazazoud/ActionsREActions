const	User = require('../models/user.js');
		twilio = require('twilio');
		accountSid = 'ACa2611f66e0cc9c706012caee07c0bb9d'; // Your Account SID from www.twilio.com/console
		authToken = 'b3d39209f66bfa6db93ff0a53f1d489d'; // Your Auth Token from www.twilio.com/console
		client = new twilio(accountSid, authToken); 

function wake2SMS(d_a_t_e) {
	if (d_a_t_e === "4:55 p.m.") {
		client.messages
      			.create({
      				body: 'Wake up Neo',
       				from: '+33644602808',
       				to: '+33666843481'
//				req.user.phone
			})
		.then(message => console.log(message.sid));
	}
}

function cat2SMS(d_a_t_e) {
	if (d_a_t_e === "6:00 p.m.") {
		client.messages
      			.create({
       				body: 'Feed the bloody animals you fool',
       				from: '+33644602808',
       				to: '+33666843481'
       			})
       		.then(message => console.log(message.sid));
	}
}

function mum2SMS(d_a_t_e) {
	if (d_a_t_e === "8:00 p.m.") {
		client.messages
       			.create({
				body: 'Call ur mum idiot',
        			from: '+33644602808',
        			to: '+33666843481'
        		})
        	.then(message => console.log(message.sid));
	}
}

module.exports = {
	start: async function (){
		wake2SMS(d_a_t_e);
		cat2SMS(d_a_t_e);
		mum2SMS(d_a_t_e);
	}
}
    