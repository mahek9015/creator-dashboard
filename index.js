require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const feedRoutes = require('./routes/feed');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require ('./routes/dashboard.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/dashboard', dashboardRoutes);

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/feed', feedRoutes);
app.use('/admin', adminRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
