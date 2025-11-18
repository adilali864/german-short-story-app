import "dotenv/config";
import cors from "cors";

import express from "express";
import { connectDB } from "./db/db.js";
import storyRoutes from "./route/story.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://german-short-story-app.vercel.app",
    ],
  })
);

app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
  res.send("backend working fine!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running at port: ", PORT);
  });
});
