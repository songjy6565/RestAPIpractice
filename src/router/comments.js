import express from 'express';
import mysql from 'mysql';

export function commRoutes(db){
	var router = express.Router();

	router.get('/:number/comments', (req, res, next)=> {
		db.query('SELECT * FROM comment WHERE parentid=?',req.params.number,(err,result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.post('/:number/comments', (req, res, next)=> {
		db.query('INSERT INTO comment (author, content, date, parentid) VALUES (?, ?, ?, ?)', [req.body.author, req.body.content, req.body.date, req.params.number], (err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT LAST_INSERT_ID()',(err1,result1)=>{
					if (err) res.status(500).json({"status": 500, "error": err1, "response" : null});
					else res.status(200).json({"status": 200, "error": null, "response" : result1});
				});
			}
		});
	});

	router.get('/:number/comments/:child', (req, res, next)=> {
		db.query('SELECT * FROM comment WHERE parentid=? and id=?',[req.params.number,req.params.child],(err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	router.put('/:number/comments/:child', (req, res, next)=> {
		var comm = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE comment SET ? WHERE parentid=? and id=?',[comm,req.params.number,req.params.child], (err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.child});
		});
	});

	router.delete('/:number/comments/:child', (req, res, next)=> {
		db.query('DELETE FROM comment WHERE parentid=? and id =?',[req.params.number,req.params.child], (err, result)=>{
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.child});
		});
	});
	return router;
}
