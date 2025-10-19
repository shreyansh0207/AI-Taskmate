const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
});

module.exports = mongoose.model('Column', ColumnSchema);
