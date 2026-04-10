const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

const auth = (req, res, next) => { if (!req.session.user) return res.redirect('/login'); next(); };

// List
router.get('/', auth, async (req, res) => {
  try {
    const eventList = await Event.find().sort({ createdAt: -1 });
    res.render('events-list', { eventList, msg: req.query.msg, error: null });
  } catch (err) {
    res.render('events-list', { eventList: [], msg: null, error: err.message });
  }
});

// Add form
router.get('/add', auth, (req, res) => res.render('event-form', { event: null, error: null }));

// Edit form
router.get('/edit/:id', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('event-form', { event, error: null });
});

// Create
router.post('/', auth, async (req, res) => {
  try {
    await Event.create(req.body);
    res.redirect('/events?msg=Saved successfully');
  } catch (err) {
    res.render('event-form', { event: req.body, error: err.message });
  }
});

// Update
router.post('/update/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/events?msg=Updated successfully');
  } catch (err) {
    res.render('event-form', { event: req.body, error: err.message });
  }
});

// Delete
router.get('/delete/:id', auth, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/events?msg=Deleted successfully');
});

module.exports = router;
