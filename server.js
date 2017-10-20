var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var app = express();

var index = require('./routes/index');
var addEvent = require('./routes/addEvent');
var addTask = require('./routes/addTask');
var addNote = require('./routes/addNote');
var getTodaysEvents = require('./routes/getTodaysEvents');
var getTodaysTasks = require('./routes/getTodaysTasks');
var getTodaysNotes = require('./routes/getTodaysNotes');

app.listen(port, function(){
    console.log('Listening on port:', port);
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Serve back static files
app.use(express.static('./public'));

app.use('/', index);
app.use('/addEvent', addEvent);
app.use('/addTask', addTask);
app.use('/addNote', addNote);
app.use('/getTodaysEvents', getTodaysEvents);
app.use('/getTodaysTasks', getTodaysTasks);
app.use('/getTodaysNotes', getTodaysNotes);