const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',     
    host: 'localhost',         
    database: 'MovieTheatreDB', 
    password: 'Mp@02092005', 
    port: 5432                 
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL database!'))
    .catch(err => console.error('Database connection error:', err));

module.exports = pool;
