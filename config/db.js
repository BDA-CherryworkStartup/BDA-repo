const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection failed');
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;