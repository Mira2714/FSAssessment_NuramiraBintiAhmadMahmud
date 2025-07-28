const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    maxlength: [10000, 'Description cannot be more than 2000 characters'] 
  },
  price: { 
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  instructor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  },
  image_url: { type: String },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  deleted_at: { 
    type: Date,
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);