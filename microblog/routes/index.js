
/*
 * GET home page.
 */

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
		req.flash('error', 'not same');
		return res.redirect('/reg');
	}
	
};


exports.login = function(req, res){
	
};


exports.doLogin = function(req, res){
	
};


exports.logout = function(req, res){
	
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