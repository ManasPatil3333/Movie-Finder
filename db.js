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

// -- select * from movie_details
// -- inner join customer_details on customer_details.screen_id = movie_details.movie_id
// -- inner join movie_reviews on movie_reviews.screen_id = movie_details.movie_id;

// select * from movie_details

// -- select * from customer_details

// -- select * from movie_review

