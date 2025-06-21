const express = require('express');
const router = express.Router();
const { evaluateSubmission } = require('../controllers/evalController');
const Evaluation = require('../models/Evaluation');


router.post('/evaluate', evaluateSubmission);

router.get('/all', async (req, res) => {
  try {
    const records = await Evaluation.find().sort({ submittedAt: -1 }); // Latest first
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch evaluations', error: err.message });
  }
});

module.exports = router;
