require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devvoid_task_manager';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/columns', require('./routes/columns'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('DevVoid Task Manager Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
