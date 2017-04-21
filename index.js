const express = require('express');
const moment = require('moment');
const sqlite = require('sqlite');
const app = express();

const apiRoutes = require('./apiRoutes');


const db = require('sqlite');
const DB_NAME = './database.sqlite';

const parser = require('body-parser');
app.use(parser.json())

const expressSession = require('express-session');
app.use(expressSession({
	secret: 'FOBAR'
}));

app.use('/', express.static('public'));

const passport = require('./passport')(app, db);


// eveything here is stuff that needs to be authenticated to be used
app.use('/api', apiRoutes(db))


Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(3000))
    .then(() => {
        console.log('\n ** Instagrammer ** Listening on port 3000 ** :)\n')
     })
    .catch(err => console.error(err.stack))