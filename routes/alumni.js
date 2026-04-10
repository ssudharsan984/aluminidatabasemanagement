const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

const auth = (req, res, next) => { if (!req.session.user) return res.redirect('/login'); next(); };

// List / Search
router.get('/', auth, async (req, res) => {
  try {
    const search = req.query.search;
    const query = search ? {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') },
        { batchYear: isNaN(search) ? -1 : parseInt(search) }
      ]
    } : {};
    const alumniList = await Alumni.find(query).sort({ createdAt: -1 });
    res.render('alumni-list', { alumniList, search, msg: req.query.msg, error: null });
  } catch (err) {
    res.render('alumni-list', { alumniList: [], search: null, msg: null, error: err.message });
  }
});

// Add form
router.get('/add', auth, (req, res) => res.render('alumni-form', { alumni: null, error: null }));

// Edit form
router.get('/edit/:id', auth, async (req, res) => {
  const alumni = await Alumni.findById(req.params.id);
  res.render('alumni-form', { alumni, error: null });
});

// Create
router.post('/', auth, async (req, res) => {
  try {
    await Alumni.create(req.body);
    res.redirect('/alumni?msg=Saved successfully');
  } catch (err) {
    res.render('alumni-form', { alumni: req.body, error: err.message });
  }
});

// Update
router.post('/update/:id', auth, async (req, res) => {
  try {
    await Alumni.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/alumni?msg=Updated successfully');
  } catch (err) {
    res.render('alumni-form', { alumni: req.body, error: err.message });
  }
});

// Delete
router.get('/delete/:id', auth, async (req, res) => {
  await Alumni.findByIdAndDelete(req.params.id);
  res.redirect('/alumni?msg=Deleted successfully');
});

module.exports = router;
