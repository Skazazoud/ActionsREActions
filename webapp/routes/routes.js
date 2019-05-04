module.exports = function(app) {

'use strict';
const fs = require('fs');
const request = require('request');
const url = 'http://localhost:8080/api/signup'
const urllogin = 'http://localhost:8080/api/login'
const tokenss = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODZkZjQwMWNhMDRiMDAxMGM0Njk0NyIsImlhdCI6MTU1MjM0MzUzNn0.5kfChLWVK9Xsks8JnjvVWo1w-mgImVOUpYpR0RoUTuo"

    	app.get('/', function(req, res) {
	    res.render('index');
	});
	
	app.get('/login', function(req, res) {
		res.render('login');
	});
	app.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	let loginInfo = {
		email: email,
		password: password,
	};
	request({
		url: urllogin,
		method: "POST",
		json: loginInfo,
	})
	var tokenss = req.body.token;
	var amail = req.body.email;
	console.log(tokenss)
	res.redirect('/profile')
	})

	app.get('/register', function(req, res) {
		res.render('register');
	})
	app.post('/register', function(req, res) {
		var email = req.body.email;
		var password = req.body.password;
		var phone = req.body.phone
		let registerInfo = {
			email: email,
			password: password,
			phone: phone
		}
		request({
			url: url,
			method: "POST",
			json: registerInfo,
		})
		res.redirect('/')
	})

	app.get('/profile', function(req, res) {
		res.render('profile');
		})
}