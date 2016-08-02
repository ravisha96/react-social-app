var express = require('express'),
    io = require('socket.io'),
    router = express.router();


router('post', function (req, res, next) {
  res.send(req.body);
});


module.exports = router;
