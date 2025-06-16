const express = require('express');
const router = express.Router();

const { submitAssignment } = require('../controllers/submissionController');

// Student Submission Route
router.post('/submit-assignment', submitAssignment);

module.exports = router;
