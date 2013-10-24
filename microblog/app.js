
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');
var partials = require('express-partials')

var MongoStore = require('connect-mongo')(express);
var settings = require('../settings');

var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);

/* open db */
db.open(function() {
    /* Select 'contact' collection */
    db.collection('users', function(err, collection) {
        /* Insert a data */
/*        
        collection.insert({
            name: 'Fred Chien',
            email: 'cfsghost@gmail.com',
            tel: [
                '0926xxx5xx',
                '0912xx11xx'
            ]
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });
*/
        /* Querying */
        collection.find( { name : "Tim" }, function(err, data) {
            /* Found this People */            
            if (data) {
                console.log('Name: ' + data.name + ', email: ' + data.password);                
            } else {
                console.log('Cannot found');
            }
        });
    });
});

var app = express();

// all environments
//app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	app.use(express.session({
		secret: settings.cookieSecret,
		store: new MongoStore({
			db: settings.db
		})
	}));

	app.use(function(req, res, next){
    	res.locals.user = req.session.user;
    	res.locals.error = req.session.error;
    	res.locals.success = req.session.success;
    	next();
  	});
	app.use(partials());
	app.use(app.router);
	//app.use(express.router(routes));
	
routes(app);

	//app.use(express.router(routes));
	app.use(express.static(path.join(__dirname, 'public')));
//});




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
app.get('/', routes.index);
app.get('/users', routes.user);
app.get('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
*/
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
