const Student=require("../models/studentModel")
const ClassStudent=require("../models/classStudentModel")
const Class=require("../models/classModel")

const createStudent = async (studentData) => {  
  try {
    const student = new Student(studentData);
    if(!student){
      throw new Error("duplicate Entry")
    }
    const data=await student.save();
    return data.id;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const getStudents = async () => {
  try {
    const students=await Student.find();
    return students;
  } catch (error) {
    throw error;
  }
};

const getStudentById = async (id) => {
  try {
    const students= await Student.findOne({id:id});
    return students;
  } catch (error) {
    throw error;
  }
};

const updateStudent = async (id, updateData) => {
    try {    
        const student=await Student.findOne({id});
        if(!student){
          throw new Error("Student Not Found")
        }
        
        const updatedStudent=await Student.findByIdAndUpdate(student._id,updateData,{
          new:true
        })
        
    
        return updatedStudent;
      } catch (error) {
        throw(error)
      }
};

const deleteStudent = async (id) => {
  try {
    const deleteStudent = await Student.deleteOne({id});
    return deleteStudent;
  } catch (error) {
    throw error;
  }
};

const createStudentByClass=async(data)=>{
  try{
    const getClassObject=await Class.findOne({name:data.class_id});
    const getStudentObject=await Student.findOne({id:data.student_id})
      const student=new ClassStudent({class_id:getClassObject._id,student_id:getStudentObject._id});
      await student.save();
      return student;
  }catch(error){
      throw error
  }
}

const getStudentByClass=async(name)=>{
  try{
    const getClassId=await Class.findOne({name});
      const classStudent=await ClassStudent.find({class_id:getClassId._id});
      if(!classStudent){
          throw new Error("No Student Found")
      }
      const studentids=classStudent.map(items=>items.student_id)
      const students=await Student.find({_id:{$in:studentids}})
      const studentsWithClass = students.map(student => {
        return { ...student.toObject(), class: name };
      });
  
      return studentsWithClass;
  }catch(error){
      throw error;
  }
}

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentByClass,
  createStudentByClass
};
