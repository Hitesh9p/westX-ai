// server.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Use routes
app.use('/', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to WestX AI Twitter Bot API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// server.js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: err.message,
        message: 'Something went wrong!'
    });
});
// server.js
const cors = require('cors');
app.use(cors());