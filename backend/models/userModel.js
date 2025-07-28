const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: [8, 'Password must be at least 8 characters']
  },
  role: { 
    type: String, 
    enum: ['student', 'instructor'], 
    required: true 
  },
  status: { 
    type: String,
    enum: ['active', 'inactive', 'banned'], 
    default: 'active' 
  },
  deleted_at: { type: Date, default: null }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);