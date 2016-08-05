var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),         /** get our configuration file. */
    routes = require('./routes/index'),
    register = require('./routes/register'),
    chatRouter = require('./routes/chatRouter'),
    authenticate = require('./routes/authenticate'),
    verifyRoutes = require('./middlewares/router'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, { origins: '*:*' }),
    router = express.Router();

/** Mongoose Connection */
mongoose.connect(config.database);
app.set('supersecret', config.secret);



io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']);
io.set("polling duration", 10);

/** Bodyparser to extract information from POST and GET. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Morgon to log requests to the console. */
app.use(logger('dev'));
app.set('port', (process.env.PORT || 5000));
/** Render engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

/**
 * *************************
 * ******  Routes  *********
 * *************************
 */

app.use('/', function (req, res) {
  res.sendFile(__dirname, '/public/chat.html');
});
app.use('/api/register', register);
// app.use('/api/chat', chatRouter({io: io}));
app.use('/api/authenticate', authenticate);

/** middleware parse all the routes except /authenticate, order is important here. */
app.use('/api', verifyRoutes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

io.on('connection', function () {
  console.log('Hello there you are connected to socketio!!!');
});

server.listen(app.get('port'), function (){
  console.log('server up and running.')
});

module.exports = app;
