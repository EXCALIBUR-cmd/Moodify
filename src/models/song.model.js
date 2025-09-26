const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audio: { type: String, required: true }, // ✅ match your route
  mood: { type: String, required: true },
});

module.exports = mongoose.model("Song", songSchema);
