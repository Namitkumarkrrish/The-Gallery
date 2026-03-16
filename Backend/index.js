const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import your Route files
const authRoutes = require('./routes/authRoutes');
const memoryRoutes = require('./routes/memoryRoutes');

const app = express();

// 2. Middleware
app.use(cors()); // This allows your frontend to talk to this server
app.use(express.json()); // This allows the server to read the 'us' and 'shivaa18' you type

// 3. Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// 4. Define the API Routes
// This makes the URL: http://localhost:5000/api/auth/login
app.use('/api/auth', authRoutes); 
app.use('/api/memories', memoryRoutes);

app.get('/', (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));