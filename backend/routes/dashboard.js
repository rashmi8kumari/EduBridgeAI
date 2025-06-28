const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Note = require('../models/Note'); // If you track uploaded notes
const Eval = require('../models/Evaluation'); // If you track evaluations

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });

    const totalNotes = await Note.countDocuments();
    const totalEvaluations = await Eval.countDocuments();

    res.json({
      users: totalUsers,
      students: totalStudents,
      teachers: totalTeachers,
      notes: totalNotes,
      evaluations: totalEvaluations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
