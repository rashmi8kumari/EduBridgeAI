const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  fileUrl: String, // Store public URL or path to uploaded file
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
