var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./controllers/database.js');

app.set('port', (process.env.PORT || 5000));

mongoose.connect(configDB.url); // connect to our database

require('./controllers/passport')(passport); 

app.use(cookieParser());
app.use(bodyParser()); 

app.use(express.static(__dirname + '/app/views'));

// views is directory for all template files
app.set('views', __dirname + '/app/views');

app.engine('html', require('ejs').renderFile);
app.use(session({ secret: 'ChiTamNguyen' })); 
app.use(bodyParser({uploadDir:'/images'}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./app/routes.js')(app, passport);

app.get("/", function(request, response) {
    response.sendFile("home.html", {root: "./app/views"});
});

app.use(function(req, res, next){
	if(res.status(404)){
		res.sendFile("404.html", {root: "./app/views"});
	}
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
