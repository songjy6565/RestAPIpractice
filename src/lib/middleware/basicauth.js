module.exports = function(app, db){
	app.use('/', function(req, res, next){
		if (req.headers.authorization || req.headers.authorization.search('Basic ') ==0){
			if(new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString() == 'jupsu:password123'){
				next();
				return;
			}
		}
		res.status(401).json({'status':401,'error':'wrong authorization'});
	});
}
