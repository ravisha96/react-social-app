var express = require('express'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    router = express.Router();

router.use(function (req, res, next) {

    /**
     * check post parameters or url parameter or header parameter for the token.
     */
    var token = req.body.token ||  req.query.token || req.headers['x-access-token'];

    // decode token
    if(token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if(err) {
                return res.status(401).json({
                  success: false,
                  type: 'OAuthException',
                  message: err
                });
            }

            /**
             * if everything works, save to request for use in other routes.
             */
            req.decoded = decoded;
            next();
        });
    } else {

        res.status(403).json({
            success: false,
            message: 'No token provided.'
        });

    }
});

module.exports = router;
