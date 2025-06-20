const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);
