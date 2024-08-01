// models/studentAttendance.js
const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);
