var express = require('express');
var bodyParser= require('body-parser')
var app = express();

var MongoClient = require('mongodb').MongoClient
var db



app.use(bodyParser.urlencoded({extended: true}))

app.set ('views', './views');
app.set ('view engine', 'jade');

app.get ('/', (req, res) => {

	var cursor = db.collection('quotes').find()
	cursor.toArray(function (err, result) {
		//console.log(result)
		//res.sendFile('/Users/tiffany/dev/tutorial-crud-express-mongodb'+'/index.html')
		res.render ('index', {quotes: result});
	})
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
  })
});

// app.get('/', (req, res) => {
// 	var cursor = db.collection('quotes').find()
// 	cursor.toArray(function (err, results) {
// 		console.log(results)
// 		// send HTML file populated with quotes here
// 	})
// })


MongoClient.connect('mongodb://tiffany:tay@ds025752.mlab.com:25752/star-wars-quotes', (err, database) => {
	if (err) return console.log(err)
	db = database
	
	var server = app.listen(3000, () => {
	console.log('Listening on port: ' + server.address().port);
	});
});
