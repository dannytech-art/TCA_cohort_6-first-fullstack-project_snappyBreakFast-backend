const express = require('express');
const cors = require('cors');
require('./config/database');
const userRouter = require('./routes/userRouter');

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",             // local dev
    "https://your-frontend.vercel.app"   // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
