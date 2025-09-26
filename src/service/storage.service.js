require("dotenv").config(); // load env vars

const mongoose = require("mongoose");
const ImageKit = require("imagekit");

// Debug to confirm env is loading
console.log("🔎 ImageKit ENV check:", {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "loaded ✅" : "missing ❌",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Upload function
function uploadfile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer, // file from multer
        fileName: new mongoose.Types.ObjectId().toString(), // unique file name
        folder: "songs", // store in songs folder
      },
      (error, result) => {
        if (error) {
          console.error("❌ ImageKit Upload Error:", error.message);
          return reject(error);
        }
        console.log("✅ Uploaded to ImageKit:", result.url);
        resolve(result);
      }
    );
  });
}

module.exports = uploadfile;
