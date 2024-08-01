const express=require('express');
const router=express.Router();
const teacherFunction=require("../functions/teacherFunction");

const teacherAttendance=require("./teacher_attendanceRoute");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.use("/attendance",teacherAttendance);

router.post("/", authenticateToken, async(req,res)=>{
    try{
        const teacherId=await teacherFunction.createTeacher(req.body);
        res.status(200).json(teacherId)
    }catch(error){
        res.status(400).json({error:"Error while adding new Teacher"})
    }
})

router.get("/", authenticateToken, async(req,res)=>{
    try{
        const teacher=await teacherFunction.getTeacher();
        res.status(200).json(teacher);
    }catch(error){
        res.status(400).json({error})
    }
})

router.get("/:id", authenticateToken, async(req,res)=>{
    try{
        const teacher=await teacherFunction.getTeacherById(req.params.id);
        res.status(200).json(teacher);

    }catch(error){
        res.status(400).json({error});
    }
})

router.put("/:id", authenticateToken, async(req,res)=>{
    try{
        const teacher=await teacherFunction.updateTeacher(req.params.id,req.body);

        res.status(200).json(teacher.info);
        
    }catch(error){
        res.json(400).json({error});
    }
})

router.delete("/:id", authenticateToken, async(req,res)=>{
    try{
        const teacher=await teacherFunction.deleteTeacher(req.params.id);
        res.status(200).json(teacher);
    }catch(error){
        res.status(400).json({error});
    }
})




module.exports= router