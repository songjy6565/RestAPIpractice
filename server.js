var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var db = require('./db');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
	console.log("server created on port 3000");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var router = require('./router/app')(app, fs, db);
