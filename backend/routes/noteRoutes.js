const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware'); // token middleware

router.post('/upload', auth, noteController.uploadNote);
router.get('/all', noteController.getAllNotes);

module.exports = router;
