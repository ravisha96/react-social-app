var express = require('express'),
    io = require('socket.io'),
    router = express.Router();


router.post('/', function (req, res, next) {
  res.send(req.body);
});


module.exports = router;
