var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),         /** get our configuration file. */
    app = express(),
    routes = require('./routes/index'),
    register = require('./routes/register'),
    authenticate = require('./routes/authenticate'),
    verifyRoutes = require('./middlewares/router'),
    port = process.env.PORT || 8080,
    http = require('http'),
    socketio = require('socket.io'),
    router = express.Router();

/** Mongoose Connection */
mongoose.connect(config.database);
app.set('supersecret', config.secret);

/** Bodyparser to extract information from POST and GET. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Morgon to log requests to the console. */
app.use(logger('dev'));


/** Render engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


/**
 * socketio configuration
 */
var server = http.createServer(app),
    io = socketio.listen(server),
    chatRouter = require('./routes/chatRouter')({io: io});

/**
 * *************************
 * ******  Routes  *********
 * *************************
 */

app.use('/', routes);
app.use('/api/register', register);
app.use('/api/chat', chatRouter);
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


// app.listen(port);

module.exports = app;
