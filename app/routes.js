var User = require('../app/models/user');

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('home.html' , {
			user : req.user
		});
	});
	app.get('/lienhe', function(req, res) {
		res.render('lienhe.html' , {
			user : req.user
		});
	});
	app.get('/B-zone', function(req, res) {
		res.render('B-zone.html' , {
			user : req.user
		});
	});
	app.get('/T-zone', function(req, res) {
		res.render('T-zone.html' , {
			user : req.user
		});
	});
	app.get('/N-zone', function(req, res) {
		res.render('N-zone.html' , {
			user : req.user
		});
	});
	app.get('/login', function(req, res) {
		res.render('login.html', { message: req.flash('error') });
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.html', { message: req.flash('signuperror') });
	});

	app.post('/signup', passport.authenticate('signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}))

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/', isLoggedIn, function(req, res) {
        res.render('home.html', {
            user : req.user
        });
    });
	app.get('/lienhe', isLoggedIn, function(req, res) {
        res.render('lienhe.html', {
            user : req.user
        });
    });
    app.get('/B-zone', isLoggedIn, function(req, res) {
        res.render('B-zone.html', {
            user : req.user
        });
    });
    app.get('/N-zone', isLoggedIn, function(req, res) {
        res.render('N-zone.html', {
            user : req.user
        });
    });
    app.get('/T-zone', isLoggedIn, function(req, res) {
        res.render('T-zone.html', {
            user : req.user
        });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}