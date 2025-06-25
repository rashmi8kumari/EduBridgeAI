const Note = require('../models/Note');

exports.uploadNote = async (req, res) => {
  try {
    const { title, subject, description, fileUrl } = req.body;
    const uploadedBy = req.user.id;

    const note = new Note({
      title,
      subject,
      description,
      fileUrl,
      uploadedBy,
    });

    await note.save();
    res.status(201).json({ msg: 'Note uploaded successfully', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Note upload failed' });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching notes' });
  }
};

