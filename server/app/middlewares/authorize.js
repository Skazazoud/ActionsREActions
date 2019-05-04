const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

userSchema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.secret,
        {
            expiresIn: process.env.secret
        });
}

modules.export.authorize = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err)
            return res.status(404).json(err);
        // registered user
        if (user)
            return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else
            return res.status(401).json(info);
    })(req, res);
}

module.exports = (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
              return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
          }
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
          "error": true,
          "message": 'No token provided.'
      });
    }
}