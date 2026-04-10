const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const totalAlumni    = await Alumni.countDocuments();
    const totalEvents    = await Event.countDocuments();
    const depts          = await Alumni.distinct('department');
    const locations      = await Alumni.distinct('location');
    const recentAlumni   = await Alumni.find().sort({ createdAt: -1 }).limit(5);
    const upcomingEvents = await Event.find().sort({ eventDate: 1 }).limit(5);
    res.json({ totalAlumni, totalEvents, totalDepts: depts.length, totalLocations: locations.length, recentAlumni, upcomingEvents });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
