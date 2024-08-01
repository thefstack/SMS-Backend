const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, unique:true,  required: true }
});

module.exports = mongoose.model('Class', classSchema);
