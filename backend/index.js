import express from "express";
import cors from "cors";
import announceRoutes from "./routes/announce.js";
import reviewRoutes from "./routes/review.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/api/announces", announceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
