const { response } = require('express');
const Datastore = require('nedb');
const express = require('express');
require('dotenv').config();

// Create server and listen on port 3000
const app = express();
const port = process.env.PORT;
app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

// Post API
app.post('/api', (request, response) => {
    const data = request.body;
    data.timestamp = Date.now();
    console.log(request.body);
    database.insert(request.body);
    response.json({ status: 'successful post!!!!!' });
});
// Get API
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            console.error(err);
            response.end();
            return;
        }
        response.json(data);
    });
});
