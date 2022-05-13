import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.route.js";
import userRoutes from "./routes/users.route.js";
import gameRoutes from "./routes/games.route.js";

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/games", gameRoutes);

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
