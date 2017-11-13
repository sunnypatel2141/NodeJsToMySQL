var express = require('express');
var mysql = require('mysql');
var path = require('path');

var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db = mysql.createConnection({
	host : 'localhost',
	user : 'nodejsuser',
	password : 'MeToSiddh',
	database : 'nodejsapp'
});

db.connect();

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/addToDB', function(req, res) {     
	let sql = "INSERT INTO PEOPLE VALUES('" + req.body.username + "', '" 
			+ req.body.email + "')";
	db.query(sql, (err, results) => {
		if (err) {
			throw err;
		}
		res.redirect('/getdata');
	});
});

app.get('/getdata', function(req, res) {
	let sql = "SELECT * FROM people";
	db.query(sql, (err, results) => {
		if (err) {
			throw err;
		}
		res.send(results);
	});
});

app.listen('3000', () => {
	console.log("server listening on 3000");
});

// var app = express();

// var db = mysql.createConnection({
// 	host : 'localhost',
// 	user : 'nodejsuser',
// 	password : 'MeToSiddh',
// 	database : 'nodejsapp'
// });

// db.connect();

// app.listen('3000', () => {
// 	console.log('Started listening on port 3000');
// });

// app.get('/', function(req,res) {
// 	res.send('Welcome to home page.');
// });

// app.get('/getdata', function(req, res) {
// 	let sql = "SELECT * FROM people";
// 	db.query(sql, (err, results) => {
// 		if (err) {
// 			throw err;
// 		}
// 		res.send(results);
// 	});
// });
