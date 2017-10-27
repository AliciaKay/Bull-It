var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var addEvent = require('./routes/addEvent');
var addTask = require('./routes/addTask');
var addNote = require('./routes/addNote');
var getTodaysEvents = require('./routes/getTodaysEvents');
var getTodaysTasks = require('./routes/getTodaysTasks');
var getTodaysNotes = require('./routes/getTodaysNotes');
var getThisWeeksEvents = require('./routes/getThisWeeksEvents');
var getThisWeeksTasks = require('./routes/getThisWeeksTasks');
var getThisWeeksNotes = require('./routes/getThisWeeksNotes');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/addEvent', addEvent);
app.use('/addTask', addTask);
app.use('/addNote', addNote);
app.use('/getTodaysEvents', getTodaysEvents);
app.use('/getTodaysTasks', getTodaysTasks);
app.use('/getTodaysNotes', getTodaysNotes);
app.use('/getThisWeeksEvents', getThisWeeksEvents);
app.use('/getThisWeeksTasks', getThisWeeksTasks);
app.use('/getThisWeeksNotes', getThisWeeksNotes);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});

