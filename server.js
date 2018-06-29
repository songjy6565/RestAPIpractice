var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./lib/db');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3500, function(){
	console.log("sever created on port 3500");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var auth = require('./lib/middleware/basicauth')(app, db);
var valid = require('./lib/middleware/validcheck')(app, db);
var indexRoutes = require('./router/index')(app, db);
app.use('/',indexRoutes);
