function Authenticate(req, res, next) {

    var UserModel = require('../models/user'),
        jwt = require('jsonwebtoken'),
        /** user to create, sign, and verify tokens. */
        config = require('../config');

    UserModel.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.json({
                success: false,
                message: req.body
            });
            return;
        }

        if (user.password !== req.body.password) {
            res.json({
                success: false,
                message: 'Authentication failed. Wrong password.'
            })
            return;
        }

        var token = jwt.sign(user, config.secret, {
            expiresIn: config.jwkExpiryDuration
        });

        res.json({
            success: true,
            message: 'User successfully authenticated.',
            token: token
        });


    });
}

module.exports = Authenticate;
