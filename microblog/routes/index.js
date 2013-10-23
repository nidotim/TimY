
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('./user.js');
exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};


exports.user = function(req, res){
	
};


exports.post = function(req, res){

};


exports.reg = function(req, res){
	res.render('reg', { title: '使用者註冊'});

};


exports.doReg = function(req, res){
	console.log(req.body['password-repeat']);
	console.log(req.body['password']);
	if(req.body['password-repeat'] != req.body['password']){
		//req.flash('error', '兩次輸入的密碼不一致');
		//req.refresh('error', 'not same');
		//req.session.messages = ['兩次輸入的密碼不一致'];
		req.session.error = '兩次輸入的密碼不一致';
		//res.locals.error = 'error';
		//res.render('兩次輸入的密碼不一致');
		//return req.session.messages;
		return res.redirect('/reg');
	}
	
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser= new User({
		name: req.body.username,
		password: password,
	});

	User.get(newUser.name, function(err, user){
		if(user){
			err = 'Username already exist';
		}
		if(err){
			req.session.error = err;
			return res.redirect('/reg');
		}

		newUser.save(function(err){
			if(err){
				//req.flash('error', err);
				console.log(err);
				return res.redirect('/reg')
			}
			req.session.user = newUser;
			req.session.success = '註冊成功';
			//req.flash('success', '註冊成功');
			res.redirect('/');
		});
	});
};


exports.login = function(req, res){
	res.render('login', {
		title: '使用者登入',
	});
};


exports.doLogin = function(req, res){
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	User.get(req.body.username, function(err, user){
		console.log(user);
		if(!user){
			req.session.error = '使用者不存在';
			return res.redirect('/login');
		}
		if(user.password != password){
			req.session.error = '使用者密碼錯誤';
			return res.redirect('/login');
		}
		req.session.user = user;
		req.session.success = '登入成功';
		res.redirect('/');
	});
};


exports.logout = function(req, res){
	req.session.user = null;
	req.session.success = '登出成功';
	res.redirect('/');
};

exports.hello = function(req, res){
	res.send('The time is ' + new Date().toString());
};


/*
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', {title:'首頁'});
	});

	app.get('/reg', function(req, res){
		res.render('reg', {
			title: '使用者註冊'
		});
	});
};

*/