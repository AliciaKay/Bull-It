var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var app = express();

var index = require('./routes/index');
var add = require('./routes/add');

app.listen(port, function(){
    console.log('Listening on port:', port);
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Serve back static files
app.use(express.static('./public'));

app.use('/', index);
app.use('/add', add);