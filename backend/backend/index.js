const express = require('express');
const connectDB = require('./config/db');
const clauseRoutes = require('./routes/clause.js');
const bodyParser = require('body-parser');
const cors = require('cors');


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

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))



//Set up routes
app.use('/api/clause', clauseRoutes);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));