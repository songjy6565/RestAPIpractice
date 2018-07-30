'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import db from './lib/db';

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3500, () => {
	console.log("sever created on port 3500");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import {bAuth} from './lib/middleware/basicauth';
import {vCheck} from './lib/middleware/validcheck';
bAuth(app,db);
vCheck(app,db);

import {indexRoutes} from './router/index';
app.use('/',indexRoutes(db));
