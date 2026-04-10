const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  phone:       String,
  batchYear:   Number,
  department:  String,
  company:     String,
  designation: String,
  location:    String,
  linkedin:    String
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);
