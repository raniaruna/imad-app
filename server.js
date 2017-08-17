var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto =require('crypto');
var Pool = require('pg').Pool;
var config = {
    user:'raniaruna2005',
    database:'raniaruna2005',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var pool = new Pool(config);
var app = express();
app.use(morgan('combined'));


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
		<div>${date.toDateString()} </div>
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

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
    

app.get('/hash/:input',function(req,res){
    var hashedStr = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedStr);
});
// get data from database 
app.get('/tb_test', function (req, res) {
	pool.query("SELECT * FROM TAG" ,function(err,result){
	    if(err){
	        res.status(500).send(err.toString());
	    } else {
            res.status(200).send(JSON.stringify(result.rows));	        
	    }
	});
  
});
app.get('/articles/:articleName', function (req, res) {
    var articleName =req.params.articleName;
	pool.query("SELECT * FROM ARTICLE WHERE TITLE =$1",[articleName] ,function(err,result){
	    if(err){
	        res.status(500).send(err.toString());
	    } else {
	        if(result.rows.length===0){
	            res.status(404).send("Article Not Found!");
	        } else {
	        var articleData =result.rows[0];
             res.status(200).send(createTemplate(articleData));
	    }
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
