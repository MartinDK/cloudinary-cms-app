const express = require('express');

// Create server and listen on port 3000
const app = express();
app.listen(3000, () => console.log('Listening 3000'));

// Where to look and serve static files from
app.use(express.static('public'));
