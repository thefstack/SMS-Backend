const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  id:{type:String, required:true, unique:true},
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  father_name: { type: String, required: true },
  mother_name: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String },
  religion: { type: String },
  category: { type: String },
  village:{type:String, required:true},
  pincode:{type:Number, required:true},
  aadhar: { type: String, unique:true ,sparse:true},
  pan: { type: String},
  joining_date: { type: Date, required: true },
  qualification:{type:String, required:true}
});

teacherSchema.path('aadhar').validate({
  validator: function(v) {
    // Only validate uniqueness if aadhar is present
    return !v || mongoose.models.Teacher.countDocuments({ aadhar: v, _id: { $ne: this._id } }).exec().then(count => count === 0);
  },
  message: 'Aadhar number must be unique'
});

module.exports = mongoose.model('Teacher', teacherSchema);
