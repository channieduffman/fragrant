require('dotenv').config({ path: '../.env' });

const pg = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        database: process.env.PG_DATABASE,
        // ssl: config['DB_SSL'] ? { rejectUnauthorized: false } : false,
    },
    migrations: {
        directory: './db/migrations',
    },
    seeds: {
        directory: './db/seeds',
    }
});
