const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Database connection configuration using environment variables
const db = mysql.createConnection({
        host: "10.0.1.104",
        user:"admin",
        password: "Admin123",
        database: 'movieDB'
});  

// Use this if you want to use environment variables instead
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'terraform-20241028035825138600000004.craayaco8wd0.us-east-1.rds.amazonaws.com',
//   user: process.env.DB_USER || 'admin',
//   password: process.env.DB_PASSWORD || 'Admin123',
//   database: process.env.DB_NAME || 'movieDB'
// });  

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Route to display movies and form to add movies
app.get('/', (req, res) => {
  const query = 'SELECT * FROM movies';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Database error');
      return;
    }
    res.render('index', { movies: results });
  });
});

// Route to handle form submission and add a new movie
app.post('/add-movie', (req, res) => {
  const { title, genre, release_year } = req.body;
  const query = 'INSERT INTO movies (title, genre, release_year) VALUES (?, ?, ?)';
  db.query(query, [title, genre, release_year], (err) => {
    if (err) {
      console.error('Error adding movie:', err);
      res.status(500).send('Database error');
      return;
    }
    // Redirect back to the home page to display the updated movie list
    res.redirect('/');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
