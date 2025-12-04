import "dotenv/config";

import express from 'express';

import { searchFragrancesByNotesAll } from './routes/searchFragrancesByNotesAll.js';
import { getAllFragrances } from './routes/getAllFragrances.js';
import { getFamilyTerms } from './routes/getFamilyTerms.js';
import { getAccordTerms } from './routes/getAccordTerms.js';
import { getNoteTerms } from './routes/getNoteTerms.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/fragrances/', getAllFragrances);

app.get('/api/fragrances/get-families', getFamilyTerms);
app.get('/api/fragrances/get-accords', getAccordTerms);
app.get('/api/fragrances/get-notes', getNoteTerms);

app.get('/api/fragrances/search', searchFragrancesByNotesAll);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});