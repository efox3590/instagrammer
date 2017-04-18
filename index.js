const express = require('express');
const moment = require('moment');
const sqlite = require('sqlite');
const app = express();

app.use('/', express.static('public'));

app.listen(3000, () => {
    console.log('\n ** Instagrammer ** Listening on port 3000 ** :)\n')
});