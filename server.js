var express = require ('express'),
	http = require('http'),
	path = require('path');

var app = express();


app.set('port', (process.env.PORT || 8080));
app.set('views', __dirname + 'views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(app.get('port'), function(){
  	console.log("Server listening on port " + app.get('port'));
});

