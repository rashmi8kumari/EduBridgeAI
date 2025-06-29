const Note = require("../models/Note");

// ✅ Upload Note - Only Teachers Allowed
exports.uploadNote = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "teacher") {
      return res.status(403).json({ msg: "Only teachers can upload notes" });
    }

    const { title, subject, description } = req.body;
    const fileUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/notes/${req.file.filename}`
      : "";

    const newNote = new Note({
      title,
      subject,
      description,
      fileUrl,
      uploadedBy: req.user.id,
    });

    await newNote.save();
    res.status(201).json({ msg: "Note uploaded successfully", note: newNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Note upload failed" });
  }
};

// ✅ Get All Notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notes" });
  }
};

// ✅ Filter Notes
exports.getFilteredNotes = async (req, res) => {
  try {
    const { subject, teacherId } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (teacherId) filter.uploadedBy = teacherId;

    const notes = await Note.find(filter)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error filtering notes" });
  }
};

// ❌ Removed: updateNote
// ❌ Removed: deleteNote



