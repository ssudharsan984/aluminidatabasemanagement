const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') }
      ]
    } : {};
    const alumni = await Alumni.find(query).sort({ createdAt: -1 });
    res.json(alumni);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    res.json(alumni);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);
    res.json(alumni);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(alumni);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
