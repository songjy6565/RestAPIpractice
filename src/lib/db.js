import mysql from 'mysql';
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'k7481492',
	database:'practice'
});
///create primary table on db (practice) in mysql.
/*connection.connect(function(err){
	if(err)console.log('err [1]');
	console.log('Db is connected.');
	connection.query('CREATE TABLE article(id int NOT NULL AUTO_INCREMENT, author varchar(255), content varchar(255), date varchar(255),PRIMARY KEY(id))', function(err, res){
		if(err)console.log('err [2]');
		connection.query('CREATE TABLE comment( id int NOT NULL AUTO_INCREMENT, author varchar(255), content varchar(255), date varchar(255), parentid int, PRIMARY KEY(id), FOREIGN KEY (parentid) REFERENCES article(id))', function(err, res){
			if(err)console.log('err [3]');
			console.log('tables are created.');
			connection.query('INSERT INTO article (author, content, date) VALUES (?,?,?)',['AAA','Here are some intersting news', '6/21'], function(err, result){
                        	if (err)console.log('err[4]');
				console.log(JSON.stringify({result}));
                	});
		});
	});
});*/

connection.connect((err) => {
	if(err)console.log('err[1]');
	else{
		console.log('DB is connected.');
		connection.query('SELECT * FROM article', (err, result) => {
			if(err)console.log('err[2]');
			else{
				console.log(JSON.stringify({result}));
			}
		});
	}
});

export default connection;
