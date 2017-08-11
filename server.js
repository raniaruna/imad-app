var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'raniaruna2005',
    database:'raniaruna2005',
    host:'http://db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var pool = new Pool(config);
var app = express();
app.use(morgan('combined'));
var articles = {
	'article-one' : {
		title: 'Article One | Rani',
		date:	'Aug 1 2017',
		heading: 'Learn WebApp',
		content: `<p>Learning Web App developemnt through IMAD 8 week program</p>
				  <p>Every week you get	video tutorials regarding different topics </p>	`
	},
	'article-two' : {
		title:'Article Two | Rani',
		date:'Aug 4 2017',
		heading:'Weekly assignments',
		content:`<p>Learning Web App developemnt through IMAD 8 week program</p>
				  <p>Every week submit assignment reading that week subject </p>	`
	},
	'article-three' :{
		title:'Article Three | Rani',
		date:'Aug 4 2017',
		heading:'Final Exam',
		content:`<p>Learning Web App developemnt through IMAD 8 week program</p>
				  <p>End of cource you can take Final exam and get the certificate </p>	`
	},

	};

function createTemplate(data){
	
	var title = data.title;
	var date =data.date;
	var content =data.content;
	var heading =data.heading;
	var htmlTemplate =`<html>
    <head>
        <link href="/ui/style.css" rel="stylesheet" />
		<title>${title}</title>
    </head>
    <body>
        <div class="container">
		<div><h1>${heading} </h1></div>
		<div>${date} </div>
		<div><p>${content} <p></div>
		<div>
    </body>
</html>`;
return htmlTemplate;
}
var counter =0;
app.get('/counter', function (req, res) {
	counter++;
  res.send(counter.toString());
});
// get data from database 
app.get('/articles/tb_test', function (req, res) {
	pool.query("SELECT * FROM ARTICLE" ,function(err,result){
	    if(err){
	        res.status(500).send(err.toString());
	    } else {
            res.status(200).send(JSON.stringify(result));	        
	    }
	});
  
});


var names = [];
app.get('/submit-name', function (req, res) {
	var name  =req.query.name;
	names.push(name);
//JSOON notation
  res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName', function (req, res) {
	var articleName =req.params.articleName
	

  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

/*
app.get('/submit-name/:name', function (req, res) {
	var name  =req.params.name;
	names.push(name);
//JSOON notation
  res.send(JSON.stringify(names));
});
*/



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
