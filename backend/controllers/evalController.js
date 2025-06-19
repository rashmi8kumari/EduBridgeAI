const Tesseract = require('tesseract.js');
const path = require('path');
require('dotenv').config();

// Evaluate student submission (mocked AI)
exports.evaluateSubmission = async (req, res) => {
  const filePath = req.body.path;

  if (!filePath) {
    return res.status(400).json({ msg: "No file path provided" });
  }

  const fullPath = path.join(__dirname, '..', filePath);

  try {
    // Step 1: OCR - Extract text from image
    const result = await Tesseract.recognize(
      fullPath,
      'eng+hin', // For Hinglish OCR
      { logger: m => console.log(m) }
    );

    const extractedText = result.data.text;

    // Step 2: Mocked AI Feedback (temporary)
    const jsonFeedback = {
      score: 3,
      feedback: "Great attempt! Diagram mention is missing. Improve structure."
    };

    // Step 3: Response back to client
    res.status(200).json({
      extractedText,
      score: jsonFeedback.score,
      feedback: jsonFeedback.feedback
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Evaluation failed", error: err.message });
  }
};



