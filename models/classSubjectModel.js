const mongoose = require('mongoose');

const subjectClassRelationshipSchema = new mongoose.Schema({
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
});

subjectClassRelationshipSchema.index({ class_id: 1, subject_id: 1 }, { unique: true });

const ClassSubject = mongoose.model('ClassSubject', subjectClassRelationshipSchema);

module.exports=ClassSubject;