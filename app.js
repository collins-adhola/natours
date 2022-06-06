const express = require("express");
const morgan = require("morgan");


const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//suspect////////////////////////
const fs = require('fs')
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//////////////////////////////

const app = express();

//    1) Middlewares
app.use(morgan("dev"));

app.use(express.json()); // middleware btn req and response

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// 3) Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;



