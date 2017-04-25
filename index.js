const express = require('express');
const sqlite = require('sqlite');
const db = require('sqlite');

const app = express();
const DB_NAME = './database.sqlite';

const moment = require('moment');

const auth = require('./authRoutes');
const apiRoutes = require('./apiRoutes');

const parser = require('body-parser');
app.use(parser.json())

const expressSession = require('express-session');
app.use(expressSession({
	secret: 'C4T5'
}));

app.use('/', express.static('public'));

app.use(auth);

const passport = require('./passport')(app, db);

// eveything below is stuff that needs to be authenticated to be used
app.use('/api', apiRoutes(db))


Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    // .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(3000))
    .then(() => {
        console.log('\n ** Instagrammer ** Listening on port 3000 ** :)\n')
     })
    .catch(err => console.error(err.stack))