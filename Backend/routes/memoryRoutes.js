const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const Memory = require('../models/Memory');
const cloudinary = require('cloudinary').v2;

// POST: Upload a new memory
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        // We add 'title' here so the backend actually catches it from your form
        const { title, caption, location } = req.body;
        
        const newMemory = new Memory({
            title: title || "A Special Moment", // Fallback if title is empty
            imageUrl: req.file.path, 
            publicId: req.file.filename,
            caption: caption,
            location: location || "Our Happy Place"
        });

        await newMemory.save();
        res.status(200).json({ message: "Memory saved successfully!", data: newMemory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload memory" });
    }
});

// GET: Fetch all memories (Newest first)
router.get('/all', async (req, res) => {
    try {
        const memories = await Memory.find().sort({ createdAt: -1 });
        res.json(memories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch memories" });
    }
});

// DELETE: Remove a memory from DB and Cloudinary
router.delete('/:id', async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) return res.status(404).json({ error: "Memory not found" });

        // 1. Delete the image from Cloudinary using its publicId
        if (memory.publicId) {
            await cloudinary.uploader.destroy(memory.publicId);
        }

        // 2. Delete from MongoDB
        await Memory.findByIdAndDelete(req.params.id);

        res.json({ message: "Memory deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete memory" });
    }
});

module.exports = router;