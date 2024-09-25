import express, { json } from 'express';
import cors from 'cors';
import { join } from 'path';
import connectDB from './config/db.js'; 
import userRoute from './routes/userRouts.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie-parser

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
connectDB();

app.use(cors({
    origin: 'http://localhost:5175', 
    credentials: true,
  }));
  app.set('view engine', 'ejs');
app.use(json());
app.use(cookieParser()); // Use cookie-parser middleware

app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
