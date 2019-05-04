// load the things we need
const mongoose = require('mongoose');
    bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
        phone: String
    },
    twitter: {
        id: String,
        token: String,
        tokenSecret: String,
        connected: Boolean,
        triggers: {
            tweet2Mail: { type: Boolean, default: false },
            msg2Mail: { type: Boolean, default: false },
            follow2Mail:{ type: Boolean, default: false },
            follow2SMS: { type: Boolean, default: false },
            msg2SMS: { type: Boolean, default: false },
        }
    },
    nodemailer: {
        state: Boolean,
    },
    timer: {
        state: Boolean,
        triggers: {
            wake2SMS: { type: Boolean, default: false },
            mum2SMS: { type: Boolean, default: false },
            cat2SMS: { type: Boolean, default: false },
        }
    },
    twilio: {
        state: { type: Boolean, default: false },
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);