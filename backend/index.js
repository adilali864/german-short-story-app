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
    origin: "http://localhost:5173",
  })
);

app.use("/api/stories", storyRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running at port: ", PORT);
  });
});
