const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware'); 
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/notes/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes

// Upload a new note (teacher only)
router.post('/upload', auth, upload.single('file'), noteController.uploadNote);

// Get all notes (students & teachers)
router.get('/all', noteController.getAllNotes);

// Filter notes (optional use)
router.get('/filter', noteController.getFilteredNotes);


module.exports = router;
