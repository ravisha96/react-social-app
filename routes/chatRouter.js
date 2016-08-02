  function chatRouter(options) {

      var express = require('express'),
          io = require('socket.io'),
          router = express.Router();


      return router.post('/', function(req, res, next) {
          var self = this;
          this.io = options.io;
          this.io.on('connection', function (socket) {
              console.log('connected');
              self.io.emit('chat', 'helo world');
          });
      });

      function callback (socket) {
        this.io.emit('chat', 'helo world');
      }
  }

  module.exports = chatRouter;
