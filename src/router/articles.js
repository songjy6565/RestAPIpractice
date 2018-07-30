import express from 'express';
import mysql from 'mysql';
import {commRoutes} from './comments';

export function artiRoutes(db){
	var router = express.Router();

	router.get('/',(req, res, next)=> {
		db.query('SELECT * FROM article', (err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.post('/',(req, res, next)=> {
		db.query('INSERT INTO article (author, content, date) VALUES (?, ?, ?)', [req.body.author, req.body.content, req.body.date] ,function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT LAST_INSERT_ID()',(err1,result1)=>{
					if (err) res.status(500).json({"status": 500, "error": err1, "response" : null});
					else res.status(200).json({"status": 200, "error": null, "response" : result1});
				});
			}
		});
	});

	router.get('/:number', (req, res, next)=> {
		db.query('SELECT * FROM article WHERE id=?',req.params.number,(err,result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.put('/:number', (req, res, next)=> {
		var arti = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE article SET ? WHERE id=?',[arti,req.params.number], (err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	router.delete('/:number', (req, res, next)=> {
		db.query('DELETE FROM article WHERE id=?',req.params.number, (err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	router.use('/',commRoutes(db));
	return router;
}
