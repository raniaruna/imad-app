var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto =require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
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
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge:1000 *60 * 60 * 24 * 30},
    resave: true,
    saveUninitialized: true
    
}));

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
app.get('/', function (req, res) {
    console.log('here starting the page');
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    var hashedStr = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedStr);
});
 

 app.post('/create-user',function(req,res){
      console.log('in server creating user 1111');
      var username = req.body.username;
     var password = req.body.password;
     var user_name = req.body.name;          
     var email = req.body.email;
     var salt = crypto.randomBytes(128).toString('hex');
     var dbString = hash(password,salt);
          console.log('in server creating user' +username+ ", "+password);
    
    
    pool.query('INSERT INTO "user" ("username","name","email","password") VALUES($1,$2,$3,$4)',[username,user_name,email,dbString] ,function(err,result){
	    if(err){
	        console.log(err.toString());
	        res.status(500).send(err.toString());
	        
	    } else {
            res.send('user name created successfuly '+username);	        
	    }
	});
});


app.post('/login',function(req,res){
     var salt = crypto.randomBytes(128).toString('hex');
     var username = req.body.username;
     var password = req.body.password;
     
    pool.query('SELECT  ID,USERNAME,PASSWORD FROM "USER" where "username"=$1 ',[username] ,function(err,result){
	    if(err){
	        res.status(500).send(err.toString());
	    } else {
	        if(result.rows.length===0){
            res.status(403).send('username/password invalid');	        
	        } else {
	            var dbString = result.rows[0].password;
	            var salt = dbString.split('$')[2];
	            var hashedPassword =  hash(password,salt);
	            if(hashedPassword === dbString){
	                req.session.auth ={userId: result.rows[0].id};
	                res.send('credentials correct!');
	            } else {
	                res.status(403).send('username/password invalid');	
	            }
	        }
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
app.get('/checklogin', function (req, res) {
    if(req.session && req.session.auth && req.session.auth.userId){
        pool.query('SELECT  ID,USERNAME,PASSWORD FROM "USER" where "id"=$1 ',[req.session.auth.userId] ,function(err,result){
	    if(err){
	        res.status(500).send(err.toString());
	    } else {
	        res.send(result.rows[0].username);
	    }
	});
    }else {
   res.status(400).send('You are not logged in');
    }
});






app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
