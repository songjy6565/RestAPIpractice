module.exports = function(app, db){
	var express = require('express');
	var router = express.Router();
	var mysql = require('mysql');
	var commRoutes = require('./comments')(app, db);

	router.get('/',function(req, res, next) {
		db.query('SELECT * FROM article', function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.post('/',function(req, res, next) {
		db.query('INSERT INTO article (author, content, date) VALUES (?, ?, ?)', [req.body.author, req.body.content, req.body.date] ,function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT LAST_INSERT_ID()',function(err1,result1){
					if (err) res.status(500).json({"status": 500, "error": err1, "response" : null});
					else res.status(200).json({"status": 200, "error": null, "response" : result1});
				});
			}
		});
	});

	router.get('/:number', function(req, res, next) {
		db.query('SELECT * FROM article WHERE id=?',req.params.number,function(err,result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.put('/:number', function(req, res, next) {
		var arti = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE article SET ? WHERE id=?',[arti,req.params.number], function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	router.delete('/:number', function(req, res, next) {
		db.query('DELETE FROM article WHERE id=?',req.params.number, function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	router.use('/',commRoutes);
	return router;
}
