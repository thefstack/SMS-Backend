const mongoose = require('mongoose');

const classStudentRelationshipSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true , unique:true},
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }
});

const ClassStudent = mongoose.model('ClassStudent', classStudentRelationshipSchema);

module.exports=ClassStudent;