const enrollmentSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  course_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  enrolled_at: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['enrolled', 'completed', 'dropped'], 
    default: 'enrolled' 
  },
  deleted_at: { 
    type: Date, 
    default: null
  }
}, { timestamps: true });

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);