module.exports = function(app, db){
	var express = require('express');
	var router = express.Router();
	var mysql = require('mysql');

	router.get('/:number/comments', function(req, res, next) {
		db.query('SELECT * FROM comment WHERE parentid=?',req.params.number,function(err,result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.post('/:number/comments', function(req, res, next) {
		db.query('INSERT INTO comment (author, content, date, parentid) VALUES (?, ?, ?, ?)', [req.body.author, req.body.content, req.body.date, req.params.number], function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT LAST_INSERT_ID()',function(err1,result1){
					if (err) res.status(500).json({"status": 500, "error": err1, "response" : null});
					else res.status(200).json({"status": 200, "error": null, "response" : result1});
				});
			}
		});
	});

	router.get('/:number/comments/:child', function(req, res, next) {
		db.query('SELECT * FROM comment WHERE parentid=? and id=?',[req.params.number,req.params.child],function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.put('/:number/comments/:child', function(req, res, next) {
		var comm = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE comment SET ? WHERE parentid=? and id=?',[comm,req.params.number,req.params.child], function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.child});
		});
	});

	router.delete('/:number/comments/:child', function(req, res, next) {
		db.query('DELETE FROM comment WHERE parentid=? and id =?',[req.params.number,req.params.child], function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.child});
		});
	});
	return router;
}
