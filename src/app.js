const express = require("express");
const cors = require("cors");
const songRoutes = require("./routes/song.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5176",
  "https://68d6ed3845ba18149fde9217--moodifyplay.netlify.app", // temporary Netlify preview
  "https://moodifyplay.netlify.app" // your final Netlify domain
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", songRoutes);

app.get("/", (req, res) => {
  res.send("Moodify backend is running 🚀");
});

module.exports = app;
