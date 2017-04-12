const express = require('express');
const app = express();

app.use('/', express.static('public'));

app.listen(4001, () => {
    console.log('\n ** Instagrammer ** listening on port 4001 :)\n')
});