const Teacher=require("../models/teacherModel")

const createTeacher=async(data)=>{
    try{
       const teacher=new Teacher(data);
       if(!teacher){
        throw new Error("Cannot create teachers");
       }
       await teacher.save();
       return teacher.id;
    }catch(error){
        throw error;
    }

}

const getTeacher=async()=>{
    try{
        const teacher=await Teacher.find();
        return teacher;
    }catch(error){
        throw error;
    }
}

const getTeacherById=async(id)=>{
    try{
        const teacher=await Teacher.findOne({id});
        return teacher;
    }catch(error){
        throw error;
    }
}

const updateTeacher=async(id,updateData)=>{
    try{
        const teacher=await Teacher.findOne({id});
        if(!teacher){
            throw new Error("No Teacher Found")
        }
        const updateTeacher=await Teacher.findByIdAndUpdate(teacher._id,updateData,{
            new:true
        });
        return updateTeacher;
    }catch(error){
        throw error
    }
}

const deleteTeacher=async(id)=>{
    try{
        const teacher=await Teacher.findOne({id});
        if(!teacher){
            throw new Error("No Teacher Found")
        }
        const deleteTeacher=await Teacher.findByIdAndDelete(teacher_id);
        return true;
    }catch(error){
        console.log(error)
        throw error;
    }
}




module.exports={
    createTeacher,
    getTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}