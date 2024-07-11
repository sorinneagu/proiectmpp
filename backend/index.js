import express from "express";
import cors from "cors";
import announceRoutes from "./routes/announce.js";
import reviewRoutes from "./routes/review.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cookieParser());

app.use("/api/announces", announceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
