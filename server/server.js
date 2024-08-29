import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

// Load environment variables
config();

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://quiz-smoky-seven.vercel.app', // Replace with your frontend URL, e.g., 'https://quiz-smoky-seven.vercel.app'
}));
app.use(express.json());

// Server port
const port = process.env.PORT || 8080;

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Connect to database and start server
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Cannot connect to the server:", error.message);
  }
}).catch(error => {
  console.error("Invalid Database Connection:", error.message);
});
