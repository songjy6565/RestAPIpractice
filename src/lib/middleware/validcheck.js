module.exports = function(app, db){
	app.use('/', function(req, res, next){
                if (req.method == 'PUT' || req.method == 'POST'){
                        var author = req.body.author;
                        var content = req.body.content;
                        var date = req.body.date;
                        if(!author || typeof author != 'string' || author.length > 255)
                                return res.status(400).json({'status':400,'error':'wrong input(author)'});
                        if(!content || typeof content != 'string' || content.length > 255)
                                return res.status(400).json({'status':400,'error':'wrong input(content)'});
                        if(!date || typeof date != 'string' || date.length > 255)
                                return res.status(400).json({'status':400,'error':'wrong input(date)'});
                }
                next();
        });
}
