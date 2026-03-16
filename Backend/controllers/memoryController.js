const Memory = require('../models/Memory');

exports.uploadMemory = async (req, res) => {
  try {
    const { caption } = req.body;
    
    // req.file.path comes from Cloudinary after multer handles it
    const newMemory = new Memory({
      imageUrl: req.file.path, 
      caption: caption,
      date: new Date()
    });

    await newMemory.save();
    res.status(201).json({ message: "Memory saved to the cloud! ❤️", memory: newMemory });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

exports.getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 }); // Newest first
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch memories" });
  }
};