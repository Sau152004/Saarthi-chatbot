import express from "express";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Nunjucks config
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Routes
app.use("/", chatRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
