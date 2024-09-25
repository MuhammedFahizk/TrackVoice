// db.js
import { connect } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
console.log(process.env.MONGODB_URI);

// MongoDB connection string (update with your database name or connection string)
const mongoURI = process.env.MONGODB_URI 

const connectDB = async () => {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
