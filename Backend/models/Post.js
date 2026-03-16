// Backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // URL of the photo
  description: { type: String, required: true }, // The story about the photo
  author: { type: String, default: "Us" },       // Who posted it
  createdAt: { type: Date, default: Date.now }   // Date of the memory
});

module.exports = mongoose.model('Post', postSchema);