var express = require('express'),
    router = express.Router(),
    UserModel = require('../models/user'),
    jwt = require('jsonwebtoken'),        /** user to create, sign, and verify tokens. */
    app = express(),
    config = require('../config');


/**
 * Authenticate user and create json token for the authenticated token.
 */


router.get('/', function (req, res, next) {
    UserModel.findOne({username: req.headers.username}, function (err, user) {
        if(err) {throw err;}

        if(!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
            return;
        }

        if(user.password !== req.headers.password) {
            res.json({success: false, message: 'Authentication failed. Wrong password.'})
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
});



module.exports = router;
