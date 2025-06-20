const Tesseract = require('tesseract.js');
const path = require('path');
const Evaluation = require('../models/Evaluation');
require('dotenv').config();

exports.evaluateSubmission = async (req, res) => {
  const { path: filePath, studentName } = req.body;

  if (!filePath || !studentName) {
    return res.status(400).json({ msg: "File path and student name required" });
  }

  const fullPath = path.join(__dirname, '..', filePath);

  try {
    const result = await Tesseract.recognize(fullPath, 'eng+hin');
    const extractedText = result.data.text;

    const jsonFeedback = {
      score: 3,
      feedback: "Great attempt! Diagram mention is missing. Improve structure."
    };

    //Save to MongoDB
    const newEval = new Evaluation({
      studentName,
      extractedText,
      score: jsonFeedback.score,
      feedback: jsonFeedback.feedback
    });

    await newEval.save();
    console.log("Evaluation saved successfully!");

    res.status(200).json({
      message: "Evaluation successful and saved",
      extractedText,
      score: jsonFeedback.score,
      feedback: jsonFeedback.feedback
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Evaluation failed", error: err.message });
  }
};




