  function chatRouter(options) {

      var express = require('express'),
          io = require('socket.io'),
          router = express.Router();


      return router.post('/', function(req, res, next) {
          this.io = options.io;
          this.io.on('connection', callback.call(this));
      });

      function callback (socket) {
        this.io.emit('chat', 'helo world');
      }
  }

  module.exports = chatRouter;
