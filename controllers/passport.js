var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/user');
var configAuth = require('./auth');

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
		usernameField : 'username',
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
		usernameField : 'username',
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
						return done(null, false, req.flash('signuperror', 'Username đã tồn tại !!!'));	
					}
					if (req.body.password != req.body.cpassword) {
						return done(null, false, req.flash('signuperror', 'Mật khẩu không khớp !!!'));
					}
					else {
						var newUser = new User();
						newUser.local.name = req.body.name;
						newUser.local.username = username;
						newUser.local.password = newUser.generateHash(password);
						newUser.local.email = req.body.email;
						newUser.local.address = req.body.address;
						newUser.local.phone = req.body.phone;
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
				user.local.phone = req.body.phone;
				user.save(function(err) {
					if (err)
						throw err;
					return done(null, user);
				});
			}
		});
	}));

	passport.use('facebook', new FacebookStrategy({
		clientID 		: configAuth.facebookAuth.clientID,
		clientSecret	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL,
		profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
	},
	function(token, refreshToken, profile, done) {
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    var newUser            = new User();
                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
};