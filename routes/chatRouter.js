  function chatRouter(options) {

      var express = require('express'),
          router = express.Router();


      return router.post('/', function(req, res, next) {
          var self = this;
          this.io = options.io;
          this.io.on('connection', function (socket) {
              console.log('connected');
              socket.emit('chat', {message: 'hello world'});
              res.send('something');
          });

          res.sendFile(__dirname, '/public/chat.html')
      });

      function callback (socket) {
        this.io.emit('chat', 'helo world');
      }
  }

  module.exports = chatRouter;
