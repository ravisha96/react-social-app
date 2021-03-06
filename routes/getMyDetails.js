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
          var authorization = req.body.token ||  req.query.token || req.headers['x-access-token'],
              decode;
          if (authorization) {
              try {
                  decode = jwt.verify(authorization, app.get('supersecret'));
              } catch (e) {
                  return res.status(401).send(e);
              }
          }

          return res.send(authorization);
      });

      return router;
  }

  module.exports = Router;
