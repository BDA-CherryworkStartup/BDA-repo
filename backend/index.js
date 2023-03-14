const express = require('express');
const connectDB = require('./config/db');
const clauseRoutes = require('./routes/clause.js');
const bodyParser = require('body-parser');


// Load environment variables
require('dotenv').config();

// Connect to MongoDB Atlas
connectDB();

// Create Express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set up middleware
app.use(express.json());

//Set up routes
app.use('/api/clause', clauseRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));