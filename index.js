const { response } = require('express');
const Datastore = require('nedb');
const express = require('express');

// Create server and listen on port 3000
const app = express();
app.listen(3000, () => console.log('Listening 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

// Post API
app.post('/api', (request, response) => {
    console.log(request.body);
    response.json({ status: 'successful!!!!!' });
});
