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
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : result});
		});
	});

	app.post('/api/v1/articles',function(req, res, next) {
		var arti = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('INSERT INTO article SET ?', arti ,function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT id FROM article WHERE content='+mysql.escape(req.body.content),function(err1,result1){
					if (err) res.json({"status": 500, "error": err1, "response" : null});
					else res.json({"status": 200, "error": null, "response" : result1});
				}); //need to set primary key(author,content,date) and compare all of them.
			}
		});
	});
	
	app.get('/api/v1/articles/:number', function(req, res, next) {
		db.query('SELECT * FROM article WHERE id='+mysql.escape(req.params.number),function(err,result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : result});
		});
	});
	
	app.put('/api/v1/articles/:number', function(req, res, next) {
		var arti = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE article SET ? WHERE id='+mysql.escape(req.params.number), arti, function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	app.delete('/api/v1/articles/:number', function(req, res, next) {
		db.query('DELETE FROM article WHERE id='+mysql.escape(req.params.number), function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : req.params.number});
		});
	});

	app.get('/api/v1/articles/:number/comments', function(req, res, next) {
		db.query('SELECT * FROM comment WHERE parentid='+mysql.escape(req.params.number),function(err,result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : result});
		});
	});

	app.post('/api/v1/articles/:number/comments', function(req, res, next) {
		var comm = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date, 'parentid' : req.params.number};
		db.query('INSERT INTO comment SET ?', comm, function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else{
				db.query('SELECT id FROM comment WHERE content='+mysql.escape(req.body.content),function(err1,result1){
					if (err) res.json({"status": 500, "error": err1, "response" : null});
					else res.json({"status": 200, "error": null, "response" : result1});
				}); //need to set primary key(author,content,date,parentid) and compare all of them.
			}
		});
	});

	app.get('/api/v1/articles/:number/comments/:child', function(req, res, next) {
		db.query('SELECT * FROM comment WHERE parentid=? ORDER BY id LIMIT ?,1',[req.params.number,(req.params.child - 1)],function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : result});
		});
	});

	app.put('/api/v1/articles/:number/comments/:child', function(req, res, next) {
		var comm = {'author' : req.body.author, 'content' : req.body.content, 'date' : req.body.date};
		db.query('UPDATE comment INNER JOIN (SELECT id as target FROM comment WHERE parentid = ? ORDER BY id LIMIT ?,1) a ON a.target = id SET ?',[req.params.number,(req.params.child-1),comm], function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : req.params.child});
		});
	});

	app.delete('/api/v1/articles/:number/comments/:child', function(req, res, next) {
		db.query('DELETE FROM comment WHERE id = (SELECT id FROM (SELECT id FROM comment WHERE parentid = ? ORDER BY id LIMIT ?,1) as a',[req.params.number,(req.params.child-1)], function(err, result){
			if (err) res.json({"status": 500, "error": err, "response" : null});
			else res.json({"status": 200, "error": null, "response" : req.params.child});
		});
	});
};
