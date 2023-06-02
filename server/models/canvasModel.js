const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  drawingData: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Canvas', drawingSchema);
