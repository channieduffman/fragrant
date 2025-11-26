require('dotenv').config();

const express = require('express');

const { searchFragrancesByNotesAll } = require('./routes/searchFragrancesByNotesAll');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/fragrances/search', searchFragrancesByNotesAll);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});