const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true,unique:true },
  name: { type: String, required: true },
  dob:{type:Date, required:true},
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  father_name: { type: String, required: true },
  mother_name: { type: String, required: true },
  guardian_name: { type: String },
  phone1: { type: String, required: true },
  phone2: { type: String },
  religion: { type: String },
  category: { type: String },
  village:{type:String, required:true},
  pincode:{type:Number, required:true},
  landmark:{type:String},
  email:{type:String},
  aadhar: { type: String, unique:true},
  monthly_fee: { type: Number, required: true },
  status:{type:String, enum:["Active","Inactive"]},
  admission_date: { type: Date }
});


const Student=mongoose.model('Student',studentSchema);

module.exports=Student;