const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
          console.log('✅ Connected to MongoDB');
          app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
          });
        })
        .catch((err) => {
          console.error('❌ MongoDB connection error:', err);
        });