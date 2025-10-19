const express = require('express');
const Column = require('../models/Column');

const router = express.Router();

// Get all columns for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const columns = await Column.find({ projectId: req.params.projectId }).sort({ order: 1 });
    res.json(columns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create column
router.post('/', async (req, res) => {
  try {
    const { projectId, name, order } = req.body;
    const column = new Column({ projectId, name, order });
    await column.save();
    res.status(201).json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update column
router.put('/:id', async (req, res) => {
  try {
    const { name, order } = req.body;
    const column = await Column.findByIdAndUpdate(
      req.params.id,
      { name, order },
      { new: true }
    );
    if (!column) return res.status(404).json({ error: 'Column not found' });
    res.json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete column
router.delete('/:id', async (req, res) => {
  try {
    const column = await Column.findByIdAndDelete(req.params.id);
    if (!column) return res.status(404).json({ error: 'Column not found' });
    res.json({ message: 'Column deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
