const express = require('express');
const cors = require('cors');
require('./config/database');
const userRouter = require('./routes/userRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const foodRouter = require('./routes/foodRouter');
const transactionRouter = require('./routes/transactionRouter');
const port = process.env.PORT;
const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",             
    "https://your-frontend.vercel.app"   
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use(userRouter);
app.use(restaurantRouter);
app.use(foodRouter);
app.use(transactionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('SnapBreakfast API is running on Vercel!');
});

module.exports = app;
