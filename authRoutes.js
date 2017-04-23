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
	console.log('in /auth/register')
	const {body} = request;
	const {first_name, last_name, email, password} = body;
	console.log('\nreq.body = \n', body)
	const isCreated = instaApp.createUser(first_name, last_name, email, password);
	console.log('\nwhats this look like ? \n', isCreated)

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



