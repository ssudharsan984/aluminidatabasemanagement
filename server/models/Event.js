const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  eventDate:   String,
  location:    String
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
