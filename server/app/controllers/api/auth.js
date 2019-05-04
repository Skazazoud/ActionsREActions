const express = require('express');
const router = express.Router();

router.post('/login', function (req, res) {
	res.status(200).json({
		jwt: 'example_login',
	})
});

router.post('/logout', function (req, res) {
	res.status(200).json({
		jwt: 'example_logout',
	})
});

router.post('/signup', function (req, res) {
	res.status(200).json({
		jwt: 'example_signup',
	})
});

router.post('/success', function (req, res) {
	res.status(200).json({
		jwt: 'example_sucess',
	})
});

module.export = router;
var jwt = require('jsonwebtoken'); 
// génere un token avec l'user ID -> jwt.io
// vérifier l'authenticité du token et le déchiffrer

