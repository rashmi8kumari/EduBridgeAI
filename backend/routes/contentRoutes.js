const express = require('express');
const router = express.Router();

const { uploadAssignment } = require('../controllers/contentController');

// Upload route
router.post('/upload-assignment', uploadAssignment);

module.exports = router;
