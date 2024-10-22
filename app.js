// app.js

const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use transaction routes for all requests to /transactions
app.use('/transactions', transactionRoutes);

// Define the port
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
