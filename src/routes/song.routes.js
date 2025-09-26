const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadfile = require("../service/storage.service");
const songModel = require("../models/song.model");

const upload = multer({ storage: multer.memoryStorage() });

// Upload song
router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No audio file uploaded" });
    if (!req.body.title || !req.body.artist) {
      return res.status(400).json({ error: "Title and artist are required" });
    }

    // Upload to ImageKit
    const fileData = await uploadfile(req.file);

    // Save in MongoDB
    const newSong = await songModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url, // confirm field from ImageKit response
      mood: req.body.mood.trim().replace(/,$/, "").toLowerCase(),
    });

    res.status(201).json({
      message: "Song uploaded successfully",
      song: newSong,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload song" });
  }
});

// Fetch songs (optionally by mood)
router.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;
    const filter = mood
      ? { mood: { $regex: new RegExp("^" + mood.trim() + "$", "i") } }
      : {};

    const songs = await songModel.find(filter);
    res.status(200).json({
      message: "Songs fetched successfully",
      songs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});


module.exports = router;
