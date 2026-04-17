require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/connectdb');
const profileRoutes = require('./routes/profileRoutes');
const { AppError } = require('./utils/customErrors');

const app = express();
connectDB();

// Mandatory CORS for grading script
app.use(cors({ origin: '*' }));
app.use(express.json());

// Protection against brute-force/spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: "error", message: "Too many requests, please try again later." }
});
app.use('/api/', limiter);

// Endpoints
app.use('/api/profiles', profileRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('API is running... Navigate to /api/profiles to see data.');
});
app.listen(PORT, () => console.log(`🚀 Wizard Level 1 API on port ${PORT}`));