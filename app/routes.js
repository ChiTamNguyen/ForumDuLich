var User = require('../app/models/user');

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('home.html');
	});
	app.get('/login', function(req, res) {
		res.render('login.html', { message: req.flash('error') });
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect : '/home',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.html', { message: req.flash('signuperror') });
	});

	app.post('/signup', passport.authenticate('signup', {
		successRedirect : '/home',
		failureRedirect : '/signup',
		failureFlash : true
	}))

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.html', {
            user : req.user
        });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}