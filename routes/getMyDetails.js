  var express = require('express'),
      router = express.Router(),
      UserModel = require('../models/user'),
      jwt = require('jsonwebtoken'),
      /** user to create, sign, and verify tokens. */
      config = require('../config');


  /**
   * Authenticate user and create json token for the authenticated token.
   */

  function Router(app) {
      router.get('/', function(req, res, next) {
          var authorization,
              decode;
          if (req.headers && req.headers.authorization) {
              authorization = req.headers.authorization;

              try {
                  decode = jwt.verify(authorization, app.get('supersecret'));
              } catch (e) {
                  return res.status(401).send(e);
              }
          }

          return res.send(decode._doc);
      });

      return router;
  }

  module.exports = Router;
