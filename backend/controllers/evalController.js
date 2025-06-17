const Tesseract = require('tesseract.js');
const path = require('path');

// Read text from uploaded image
exports.evaluateSubmission = async (req, res) => {
  const filePath = req.body.path;

  if (!filePath) {
    return res.status(400).json({ msg: "No file path provided" });
  }

  const fullPath = path.join(__dirname, '..', filePath);

  try {
    const result = await Tesseract.recognize(
      fullPath,
      'eng',  // Hindi ke liye 'hin'
      { logger: m => console.log(m) }
    );

    const extractedText = result.data.text;

    console.log("File to evaluate:", fullPath);


    // Simple rule-based feedback (AI model can be added later)
    let feedback = '';
    if (extractedText.toLowerCase().includes('photosynthesis')) {
      feedback = "Great! You mentioned the key concept.";
    } else {
      feedback = "Answer seems incomplete. Please revise.";
    }

    res.status(200).json({
      extractedText,
      feedback
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error during OCR" });
  }
};

