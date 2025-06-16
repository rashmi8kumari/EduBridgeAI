const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage configuration for student submissions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/submissions';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// File filter (allow images, pdf, docx etc)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|docx|doc/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb('Error: Only PDF, Image, Doc files allowed!');
  }
};

const upload = multer({
  storage,
  fileFilter
}).single('file');  // form-data me 'file' field rahega

exports.submitAssignment = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json({
      msg: "Submission uploaded successfully",
      filename: req.file.filename,
      path: req.file.path
    });
  });
};
