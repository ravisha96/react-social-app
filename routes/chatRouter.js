  function chatRouter(options) {

      var express = require('express'),
          router = express.Router();


      return router.post('/', function(req, res, next) {
          var self = this;
          this.io = options.io;
          this.io.sockets.on('connection', function (socket) {
              console.log('connected');
              socket.emit('chat', {message: 'helo world'});
          });
      });

      function callback (socket) {
        this.io.emit('chat', 'helo world');
      }
  }

  module.exports = chatRouter;
