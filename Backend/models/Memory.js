const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    // ADDED: This is the field that will store your Heading
    title: {
        type: String,
        required: true,
        default: "A Special Moment"
    },
    imageUrl: {
        type: String,
        required: true
    },
    // Add this so Cloudinary can identify the file for deletion
    publicId: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Our Happy Place"
    },
    dateOfMemory: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: String,
        default: "Us"
    }
}, { timestamps: true });

module.exports = mongoose.model('Memory', MemorySchema);