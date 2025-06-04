const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Create a connection pool
const db = mysql.createPool({
  host: "10.0.1.104",
  user: "admin",
  password: "Admin123",
  database: "movieDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Use this if you want to use environment variables instead
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'terraform-20241028035825138600000004.craayaco8wd0.us-east-1.rds.amazonaws.com',
//   user: process.env.DB_USER || 'admin',
//   password: process.env.DB_PASSWORD || 'Admin123',
//   database: process.env.DB_NAME || 'movieDB'
// });  

// Example: test connection on each request
app.use((req, res, next) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('MySQL connection failed:', err);
      res.status(500).send('Database connection error');
    } else {
      connection.release(); // Always release the connection back to the pool
      next();
    }
  });
});

// Home route
app.get('/', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).send('Database error');
    }
    res.render('index', { movies: results });
  });
});

// Add movie route
app.post('/add-movie', (req, res) => {
  const { title, genre, release_year } = req.body;
  db.query(
    'INSERT INTO movies (title, genre, release_year) VALUES (?, ?, ?)',
    [title, genre, release_year],
    (err) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).send('Database error');
      }
      res.redirect('/');
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
