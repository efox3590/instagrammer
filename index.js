const express = require('express');
const moment = require('moment');
const sqlite = require('sqlite');
const app = express();

const apiRoutes = require('./apiRoutes');

const passport = require('./passport')

const db = require('sqlite');
const DB_NAME = './database.sqlite';

app.use('/', express.static('public'));
app.use('/api', apiRoutes(db))


Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(3000))
    .then(() => {
        console.log('\n ** Instagrammer ** Listening on port 3000 ** :)\n')
     })
    .catch(err => console.error(err.stack))