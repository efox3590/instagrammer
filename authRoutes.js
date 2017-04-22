const express = require('express');

const authApp = express();

const instaApp = require('./instaApp')

// parser session middleware
const parser = require('body-parser');

// pull in session middleware
const expressSession = require('express-session');

// use body parser
authApp.use(parser.json());

authApp.use(expressSession({
	secret: 'LOLSECRETZ'
}));

authApp.post('/auth/register', (request, response) => {
	const {body} = request;
	const {fname, lname, email, pw1} = body;
	console.log('req.body = ', body)
	console.log(fname, lname, email, pw1);
	const isCreated = instaApp.createUser(fname, lname, email, pw1);

	response.header('Content-Type', 'application/json');
	if (isCreated) {
		response.send({success: true})
	}
	else {
		response.header('Content-Type', 'application/json');
		response.status(400)
		response.send({error: 'some fields not valid LOL'})
	}
});



module.exports = authApp;



