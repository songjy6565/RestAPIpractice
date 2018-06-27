var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var db = require('./db');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3500, function(){
	console.log("server created on port 3500");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	if (req.headers.authorization || req.headers.authorization.search('Basic ') ==0){
		if(new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString() == 'jupsu:password123'){
			next();
			return;
		}
	}
	res.status(401).json({'status':401, 'error':Authorization Failed.});
});

app.use(function(req, res, next){
	if (req.method == 'PUT' || req.method == 'POST'){
		var author = req.body.author;
		var content = req.body.content;
		var date = req.body.date;
		if(!author || typeof author != 'string' || author.length > 255)
			return res.status(400).json({'status':400,'error':request body is wrong(author)});
		if(!content || typeof content != 'string' || content.length > 255)
			return res.status(400).json({'status':400,'error':request body is wrong(content)});
		if(!date || typeof date != 'string' || date.length > 255)
			return res.status(400).json({'status':400,'error':request body is wrong(date)});
	}
	next();
});

var router = require('./router/app')(app, fs, db);
