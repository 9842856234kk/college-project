const express = require('express');
const cors = require('cors');
const collegeRoutes = require('./routes/collegeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { poolPromise } = require('./db'); 
require('./db')// Import poolPromise from db.js
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const { connectToDatabase } = require('./db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// College routes
app.use('/api/colleges', collegeRoutes);

// Student routes
app.use('/api/auth', studentRoutes);
app.use('/api/review', reviewRoutes);
// Start the server after database connection is established
const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query('SELECT * FROM Items'); // Example query
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
    await poolPromise;
    const result = await poolPromise.request().query('SELECT * FROM student'); 
    console.log(result) // Wait for database connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
