import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import listingRouter from "./routes/listingRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
// import path from 'path';

// dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

  // const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(10000, () => {
  console.log("Server is running on port 10000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
