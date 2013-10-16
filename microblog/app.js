
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', routes.user);
app.get('/post', routes.post);
app.get('/reg', routes.reg);
app.post('reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);

//Tim start
var users = {
	'byvoid':{
		name: 'Carbo',
		website: 'http://www.byvoid.com'
	}
};
/*
app.all('/user/:username', function(req, res, next){
	if(users[req.params.username]){
		next();
	}else{
		next(new Error(req.params.username + ' does not exist.'));
	}
	//console.log('all methods captured');
	//next();
});
app.get('/user/:username', function(req, res){
	res.send('user: ' + req.params.username);
});
*/




//Tim end
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
