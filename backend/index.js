import express from "express";
import cors from "cors";
import announceRoutes from "./routes/announce.js";

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.json({ message: "Hello World!" });
// });

app.use("/", announceRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
