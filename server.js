const express = require('express');
const cors = require('cors');
require('./config/database');
const userRouter = require('./routes/userRouter');

const app = express();

// ✅ CORS setup (must be before your routes)
app.use(cors({
  origin: "http://localhost:5173",  // frontend dev server
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Routes
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('🚀 SnapBreakfast API is running on Vercel!');
});

module.exports = app;
