const express = require('express');
const cors = require('cors');
const pool = require('./db'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/movies/:name', async (req, res) => {
    try {
        const movieName = req.params.name;
        const query = 'SELECT * FROM Movie_Details WHERE Movie_Name ILIKE $1';
        const result = await pool.query(query, [`%${movieName}%`]);

        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        console.error('Error fetching movie:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

app.post('/customers', async (req, res) => {
    try {
        const { name, screen_id, movie_ticket } = req.body;
        const query = `INSERT INTO public."customer_details" (Name, Screen_ID, Movie_Ticket) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, screen_id, movie_ticket]);

        res.status(201).json({ message: "Customer added successfully!", customer: result.rows[0] });
    } catch (err) {
        console.error('Error inserting customer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/add-review', async (req, res) => {
//     try {
//         const { screen_id, name, movie_id, review } = req.body;

//         console.log("📥 Received data:", req.body);  // Debugging log

//         if (!screen_id || !name || !movie_id || !review) {
//             return res.status(400).json({ error: "❌ All fields are required" });
//         }

//         const query = 'INSERT INTO movie_reviews (screen_id, name, movie_id, review) VALUES ($1, $2, $3, $4)';
//         await pool.query(query, [screen_id, name, movie_id, review]);

//         console.log("✅ Review inserted successfully");
//         res.status(201).json({ message: '✅ Review added successfully!' });
//     } catch (err) {
//         console.error('❌ Error inserting review:', err);
//         res.status(500).json({ error: '❌ Failed to add review' });
//     }
// });

app.post('/add-review', async (req, res) => {
    try {
        console.log("📩 Received Data in Backend:", req.body); // Debugging log

        const { screen_id, name, movie_id, review } = req.body;
        
        if (!screen_id || !name || !movie_id || !review) {
            console.log("❌ Missing Data:", { screen_id, name, movie_id, review });
            return res.status(400).json({ error: "❌ All fields are required" });
        }

        const query = 'INSERT INTO movie_reviews (screen_id, name, movie_id, review) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [screen_id, name, movie_id, review]);

        console.log("✅ Review successfully added!");
        res.status(201).json({ message: "✅ Review added successfully!" });
    } catch (err) {
        console.error('❌ Error inserting review:', err);
        res.status(500).json({ error: '❌ Failed to add review' });
    }
});


