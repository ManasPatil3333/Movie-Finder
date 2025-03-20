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