var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var TweetsRouter = require('./routes/tweets');
const getFollowers = require('./routes/getAllfollwers');
const getFollowersOfUser = require('./routes/getAllfollwersOfUser');
const user = require('./routes/getUser');
const tweetSave = require('./routes/getTweets');
const makeData = require('./routes/makeDataForProcess');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', TweetsRouter);
app.use('/getUser', user);
app.use('/getFollowers',getFollowers);
app.use('/getFollowersUser',getFollowersOfUser);
app.use('/getTweet', tweetSave);
app.use('/makeData', makeData);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
