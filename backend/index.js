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
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/announces", announceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
