const express = require('express');
const cors = require('cors');
require('./config/database');
const userRouter = require('./routes/userRouter');
const resturantRouter = require('./routes/resturantRouter');
const foodRouter = require('./routes/foodRouter');
// const port = process.env.PORT;
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
app.use(resturantRouter);
app.use(foodRouter);


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.get('/', (req, res) => {
  res.send('SnapBreakfast API is running on Vercel!');
});

module.exports = app;
