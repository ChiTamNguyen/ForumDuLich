var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
		usernameFiedl : 'username',
		passReqToCallback : true
	},
	function(req, username, password, done) {
		process.nextTick(function() {
			User.findOne({ 'local.username' : username }, function(err, user) {
				if (err) { 
					return done(err);
				}
				if (!user)
					return done(null, false, req.flash('error', 'User không tồn tại.'));

				if (!user.verifyPassword(password))
					return done(null, false, req.flash('error', 'Nhập lại mật khẩu đúng.'));
				else
					return done(null, user);
			});
		});
	}));

	passport.use('signup', new LocalStrategy({
		usernameFiedl : 'username',
		passReqToCallback : true
	},
	function(req, username, password, done) {
		process.nextTick(function() {
			if (!req.user) {
				User.findOne({ 'local.username' : username }, function(err, user) {
					if (err) { 
						return done(err);
					}
					if (user) {
						return done(null, false, req.flash('signuperror', 'Username đã tồn tại'));	
					}
					else {
						var newUser = new User();
						newUser.local.name = req.body.name;
						newUser.local.username = username;
						newUser.local.password = newUser.generateHash(password);
						newUser.local.email = req.body.email;
						newUser.local.address = req.body.address;
						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			}
			else {
				var user = req.user;
				user.local.name = req.body.name;
				user.local.username = username;
				user.local.password = user.generateHash(password);
				user.local.email = req.body.email;
				user.local.address = req.body.address;
				user.save(function(err) {
					if (err)
						throw err;
					return done(null, user);
				});
			}
		});
	}
	));
};