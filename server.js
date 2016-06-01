var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/views'));

// views is directory for all template files
app.set('views', __dirname + '/views');

app.get("/", function(request, response) {
    response.sendFile("home.html", {root: "./views"});
});

app.use(function(req, res, next){
	if(res.status(404)){
		res.sendFile("404.html", {root: "./views"});
	}
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


