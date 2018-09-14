const express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

const app = module.exports = express.Router();

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByusername(username, function (err, user) {
			console.log('user: ', user);
			if (err) console.log('error user not found: ', err);
			//if(err) throw err;
			if (!user[0]) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user[0].password, function (isMatch) {
				if (isMatch) {

					//save password for front end
					user[0].password = password;

					return done(null, user[0]);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	//save password in request
	user = { id: user.id, password: user.password };

	done(null, user);
});

passport.deserializeUser(function (userObj, done) {
	User.getUserById(userObj.id, function (err, user) {
		if (err) console.log(err);
		done(err, user);
	});
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}

// index page 
app.get('/', function (req, res) {
	var drinks = [
		{ name: 'Bloody Mary', drunkness: 3 },
		{ name: 'Martini', drunkness: 5 },
		{ name: 'Scotch', drunkness: 10 }
	];
	var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

	res.render('pages/index', {
		drinks: drinks,
		tagline: tagline
	});
});

//home page for capture images and send to server
app.get('/home', (req,res) => {
	res.render('pages/home');
})

//login page
app.get('/login', (req, res) => {
	res.render('pages/login');
})


app.post('/login',
	passport.authenticate('local', { successRedirect: '/pannel', failureRedirect: '/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

app.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
});

// Get pannel
app.get('/pannel', ensureAuthenticated, function (req, res) {
    // res.send(req.user) 
	res.render('pannel/user', {page:'User', user: req.user });
});
app.get('/user', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/user', { page:'User',user: req.user });
});
app.get('/dashboard', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/dashboard', { page: 'DashBoard' ,user: req.user });
});
app.get('/icons', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/icons', { page: 'Icons',user: req.user });
});
app.get('/maps', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/maps', { page:'Maps',user: req.user });
});
app.get('/notifications', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/notifications', { page:'Notifications', user: req.user });
});
app.get('/table', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/table', { page:'Table',user: req.user });
});
app.get('/typography', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/typography', { page: 'Typography',user: req.user });
});
app.get('/upgrade', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/upgrade', { page:'Upgrade', user: req.user });
});
app.get('/gallery', ensureAuthenticated, function (req, res) {
	// res.send(req.user)
	res.render('pannel/gallery', { page:'Gallery', user: req.user });
});