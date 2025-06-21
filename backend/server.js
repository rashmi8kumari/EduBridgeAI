require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const evalRoutes = require('./routes/evalRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/eval', require('./routes/evalRoutes'));
app.use('/api/upload', uploadRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Example Route
app.get('/', (req, res) => {
  res.send('EduBridge AI Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
