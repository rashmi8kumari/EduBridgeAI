const express = require('express');
const router = express.Router();
const { evaluateSubmission } = require('../controllers/evalController');

router.post('/evaluate', evaluateSubmission);

module.exports = router;
