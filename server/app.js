import "dotenv/config";

import express from 'express';

import { getAllFragrances } from './routes/getAllFragrances.js';
import { getFragrancesAnd } from "./routes/getFragrancesAnd.js";
import { getFragrancesOr } from "./routes/getFragrancesOr.js";
import { getTerms } from './routes/getTerms.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/fragrances/get-terms/:level', getTerms);

app.get('/api/fragrances/', getAllFragrances);

app.get('/api/fragrances/and', getFragrancesAnd);

app.get('/api/fragrances/or', getFragrancesOr);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});