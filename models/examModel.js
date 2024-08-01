const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  full_marks: { type: Number, required: true }
});

module.exports = mongoose.model('Exam', examSchema);
