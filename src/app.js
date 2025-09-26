const express = require("express");
const cors = require("cors");
const songRoutes = require("./routes/song.routes");

const app = express();

// CORS setup (allow localhost during dev + any domain in production)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite default dev server
      "http://localhost:5176", // in case you're using this
      "https://your-frontend-deployment.com", // replace later with your frontend domain
      "*" // allow all for now
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api", songRoutes);

// Default root endpoint
app.get("/", (req, res) => {
  res.send("Moodify backend is running 🚀");
});

module.exports = app;
