const express = require("express");
const cors = require("cors");
const songRoutes = require("./routes/song.routes"); 
const app = express()
 
// Allow frontend dev server to access API
app.use(
  cors({
    origin: "http://localhost:5174", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", songRoutes);
module.exports = app