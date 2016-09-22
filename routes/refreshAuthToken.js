function Router(express) {

  var router = express.Router(),
      jwt = require('jsonwebtoken'),
      config = require('../config'),
      User = require('../models/user');

    router.get('/', function(req, res, next) {

        /**
         * check post parameters or url parameter or header parameter for the token.
         */
        var token = req.body.token || req.query.token || req.headers['x-access-token'],
            decode;

        if (!token) { return; }

        decode = jwt.decode(token, config.secret);

        User.find({}).exec(function(error, result) {
            if (error) {
                throw error;
            }

            res.send({
                success: true,
                data: decode._doc
            });
        });
    });
    return router;
}


module.exports = Router;
