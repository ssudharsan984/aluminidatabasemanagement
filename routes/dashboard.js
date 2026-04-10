const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const totalAlumni    = await Alumni.countDocuments();
    const totalEvents    = await Event.countDocuments();
    const depts          = await Alumni.distinct('department');
    const locations      = await Alumni.distinct('location');
    const recentAlumni   = await Alumni.find().sort({ createdAt: -1 }).limit(5);
    const upcomingEvents = await Event.find().sort({ createdAt: -1 }).limit(5);
    res.render('dashboard', { totalAlumni, totalEvents, totalDepts: depts.length, totalLocations: locations.length, recentAlumni, upcomingEvents });
  } catch (err) {
    res.render('dashboard', { error: err.message, totalAlumni: 0, totalEvents: 0, totalDepts: 0, totalLocations: 0, recentAlumni: [], upcomingEvents: [] });
  }
});

module.exports = router;
