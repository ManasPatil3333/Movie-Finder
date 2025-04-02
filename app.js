const pool = require('./db'); 

pool.query('SELECT * FROM movie_details', (err, result) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Movies:', result.rows);
    }
});

async function addCustomer() {
    const name = document.getElementById('custName').value;
    const screen_id = document.getElementById('screenId').value;
    const movie_ticket = document.getElementById('movieTicket').value;

    const response = await fetch('http://localhost:5000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, screen_id, movie_ticket })
    });

    const data = await response.json();
    document.getElementById('customerResult').innerText = data.message || data.error;
}

async function searchMovie() {
    const movieName = document.getElementById('searchInput').value;
    const response = await fetch(`http://localhost:5000/movies/${movieName}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('result').innerHTML = `
            <h2>${data[0].movie_name}</h2>
            <p><strong>Description:</strong> ${data[0].description}</p>
            <p><strong>Review:</strong> ${data[0].review}</p>
            <p><strong>Rating:</strong> ${data[0].rating}/10</p>
        `;
    } else {
        document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
    }
}

async function addReview(event) {
    event.preventDefault();  // ✅ Prevent form from reloading
    
    console.log("✅ addReview function called!");

    // ✅ Corrected IDs
    const name = document.getElementById('custName1').value;
    const screen_id = document.getElementById('screenId1').value;
    const movie_id = document.getElementById('movieId').value;  // Fixed missing movieId
    const review = document.getElementById('review').value;  // Fixed correct ID

    if (!name || !screen_id || !movie_id || !review) {
        alert("❌ Please fill in all fields.");
        return;
    }

    try {
        console.log("📤 Sending Review Data:", { screen_id, name, movie_id, review });

        const response = await fetch('http://localhost:5000/add-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ screen_id, name, movie_id, review })
        });

        const data = await response.json();
        console.log("✅ Review Response:", data);

        if (!response.ok) {
            throw new Error(data.error || "❌ Failed to add review");
        }

        alert("✅ Review added successfully!");
        document.getElementById('reviewForm').reset();  // ✅ Reset form after success
    } catch (error) {
        console.error("❌ Error:", error.message);
        alert(error.message);
    }
}
