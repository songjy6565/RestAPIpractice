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
};
