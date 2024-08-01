const Exam=require("../models/examModel")

const createExam= async(data)=>{
    try{
         const exam=new Exam(data);
         const result=await exam.save();
         return result;
    }catch(error){
        throw error;
    }
}

const getExam=async()=>{
    try{
        const exam=await Exam.find();
        return exam;
    }catch(error){
        throw error;
    }
}

const getExamById=async(name)=>{
    try{
        const exam=await Exam.findOne({name})
        if(!exam){
            throw new Error("No Exam Found")
        }
        return result;
    }catch(error){
        throw error;
    }
}

const updateExam=async(name,updateData)=>{
    try{
        const exam=await Exam.findOne({name})
        if(!exam){
            throw new Error("No Exam Found")
        }
        const updateClas=await Exam.findByIdAndUpdate(exam._id,updateData,{
            new:true
        });
        return updateClas;
    }catch(error){
        throw error;
    }
}

const deleteExam=async(name)=>{
    try{
        const exam=await Exam.findOne({name})
        if(!exam){
            throw new Error("No Class Found")
        }
        const deleteClas=await Class.findByIdAndDelete(exam._id)
        return true;
    }catch(error){
        throw error;
    }
}

module.exports={
    getExam,
    createExam,
    getExamById,
    updateExam,
    deleteExam
}
