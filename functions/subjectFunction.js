const Subject=require("../models/subjectModel")
const ClassSubject=require("../models/classSubjectModel")
const Teacher=require("../models/teacherModel");
const Class=require("../models/classModel");

const createSubject=async(data)=>{
    try{
        const subject= new Subject(data);
        await subject.save();
        return subject;
    }catch(error){
        console.log(error)
        throw error;
    }
}

const getSubject=async()=>{
    try{
        const subject=await Subject.find();
        return subject;
    }catch(error){
        throw error;
    }
}

const getSubjectById=async(id)=>{
    try{
        const subject=await Subject.findOne({id});
        if(!subject){
            throw new Error("No Subject Found")
        }

        return subject

    }catch(error){
        return error;
    }
}

const updateSubject=async(id,updateData)=>{
    try{
        const subject=await Subject.findOne({id});
        if(!subject){
            throw new Error("No Subject Found")
        }
        const updateSubject= await Subject.findByIdAndUpdate(subject._id,updateData)
        return updateSubject;
    }catch(error){
        return error;
    }
}

const deleteSubject=async(id)=>{
    try{
        const subject=await Subject.findOne({id});
        if(!subject){
            throw new Error("No Subject Found")
        }
        const updateSubject= await Subject.findByIdAndDelete(subject._id);
        return true;
    }catch(error){
        throw error;
    }
}





const createSubjectByClass=async(data)=>{
    try{
        const getTeacherObject=await Teacher.findOne({id:data.teacher_id})
        const getSubjectObject=await Subject.findOne({id:data.subject_id});
        const getClassObject=await Class.findOne({name:data.class_id})

        const subjectByClass=new ClassSubject({teacher_id:getTeacherObject._id,subject_id:getSubjectObject._id,class_id:getClassObject._id});

        await subjectByClass.save();
        return subjectByClass
    }catch(error){
        throw error
    }
}

const getSubjectByClass=async(class_id)=>{
    try{
        const getClassObject=await Class.findOne({name:class_id});
        const subjectData=await ClassSubject.find({class_id:getClassObject._id});
        if(!subjectData){
            throw new Error("No Subject found")
        }
        const subjectids=subjectData.map(items=>items.subject_id)
        const subjects=await Subject.find({_id:{$in:subjectids}})
        const subjectsWithClass = subjects.map(subject => {
            return { ...subject.toObject(), class: class_id };
          });
    
        return subjectsWithClass;
    }catch(error){
        throw error
    }
}

module.exports={
    createSubject,
    getSubject,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getSubjectByClass,
    createSubjectByClass
}