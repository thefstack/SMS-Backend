const Class=require("../models/classModel");


const createClasses= async(classes)=>{
    try{
         const clas=new Class(classes);
         const result=await clas.save();
         return result;
    }catch(error){
        throw error;
    }
}

const getClasses=async()=>{
    try{
        const clas=await Class.find();
        return clas;
    }catch(error){
        throw error;
    }
}

const getClassesById=async(name)=>{
    try{
        const clas=await Class.findOne({name:name})
        if(!clas){
            throw new Error("No Class Found")
        }
        return clas;
    }catch(error){
        throw error;
    }
}



const updateClasses=async(name,updateData)=>{
    try{
        const clas=await Class.findOne({name})
        if(!clas){
            throw new Error("No Class Found")
        }
        const updateClas=await Class.findByIdAndUpdate(clas._id,updateData,{
            new:true
        });
        return updateClas;
    }catch(error){
        throw error;
    }
}

const deleteClasses=async(id)=>{
    try{
        const clas=await Class.findOne({name})
        if(!clas){
            throw new Error("No Class Found")
        }
        const deleteClas=await Class.findByIdAndDelete(clas._id)
        return true;
    }catch(error){
        throw error;
    }
}


module.exports={
    getClasses,
    createClasses,
    getClassesById,
    updateClasses,
    deleteClasses,
    
}