const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  id:{type:String, unique:true, required:true},
  name: { type: String, required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);
