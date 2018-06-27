var mysql = require('mysql');
module.exports = function(app, fs, db)
{
	app.get('/',function(req,res){
		res.render('index.html',{});
	});
	
	/*app.get('/api/v1/articles',function(req,res){
		fs.readFile(__dirname + "/../data/" + "articles.json", "utf8", function (err, data){
		console.log(data);
		res.end(data);
		});
	});*/
	
	app.get('/api/v1/articles',function(req, res, next) {
		db.query('SELECT * FROM article', function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	app.post('/api/v1/articles',function(req, res, next) {
		var arti = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('INSERT INTO article SET ?', arti ,function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT LAST_INSERT_ID()',function(err1,result1){
					if (err) res.status(500).json({"status": 500, "error": err1, "response" : null});
					else res.status(200).json({"status": 200, "error": null, "response" : result1});
				});
			}
		});
	});
	
	app.get('/api/v1/articles/:number', function(req, res, next) {
		db.query('SELECT * FROM article WHERE id='+mysql.escape(req.params.number),function(err,result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});
	
	app.put('/api/v1/articles/:number', function(req, res, next) {
		var arti = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE article SET ? WHERE id='+mysql.escape(req.params.number), arti, function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	app.delete('/api/v1/articles/:number', function(req, res, next) {
		db.query('DELETE FROM article WHERE id='+mysql.escape(req.params.number), function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	app.get('/api/v1/articles/:number/comments', function(req, res, next) {
		db.query('SELECT * FROM comment WHERE parentid='+mysql.escape(req.params.number),function(err,result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	app.post('/api/v1/articles/:number/comments', function(req, res, next) {
		var comm = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date, 'parentid' : req.params.number};
		db.query('INSERT INTO comment SET ?', comm, function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT LAST_INSERT_ID()',function(err1,result1){
					if (err) res.status(500).json({"status": 500, "error": err1, "response" : null});
					else res.status(200).json({"status": 200, "error": null, "response" : result1});
				});
			}
		});
	});

	app.get('/api/v1/articles/:number/comments/:child', function(req, res, next) {
		db.query('SELECT * FROM comment WHERE id='+mysql.escape(req.params.child),function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : result});
		});
	});

	app.put('/api/v1/articles/:number/comments/:child', function(req, res, next) {
		var comm = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE comment SET ? WHERE id='+mysql.escape(req.params.child),comm, function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.child});
		});
	});

	app.delete('/api/v1/articles/:number/comments/:child', function(req, res, next) {
		db.query('DELETE FROM comment WHERE id ='+mysql.escape(req.params.child), function(err, result){
			if (err) res.status(500).json({"status": 500, "error": err, "response" : null});
			else res.status(200).json({"status": 200, "error": null, "response" : req.params.child});
		});
	});
};
