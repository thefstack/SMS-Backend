// models/studentExamSubjectClassRelationship.js
const mongoose = require('mongoose');

const studentExamSubjectClassRelationshipSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  exam_total_marks_obtained: { type: Number, required: true }
});

module.exports = mongoose.model('StudentExamSubjectClassRelationship', studentExamSubjectClassRelationshipSchema);
