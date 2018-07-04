module.exports = function(app, db){
	var express = require('express');
	var router = express.Router();
	var artiRoutes = require('./articles')(app, db);

	router.get('/',function(req,res){
		res.render('index.html',{});
	});

	router.use('/api/v1/articles', artiRoutes);
	return router;
};
