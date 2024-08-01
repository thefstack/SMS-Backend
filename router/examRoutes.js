const express=require("express");
const router=express.Router();
const examFunction=require("../functions/examFunction");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.post("/",async(req,res)=>{
    try{
        const Exam=await examFunction.createExam(req.body);
        res.status(200).json(Exam)
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/",async(req,res)=>{
    try{
        const Exam=await examFunction.getExam();
        res.status(200).json(Exam)
    }catch(error){
        res.status(400).json(error);
    }

})

router.get("/:name",async(req,res)=>{
    try{
        
        const Exam=await examFunction.getExamById(req.params.name);
        res.status(200).json(Exam)
    }catch(error){
        res.status(400).json(error);
    }

})

router.put("/:name",async(req,res)=>{
    try{
        const Exam=await examFunction.updateExam(req.params.name,req.body);
        res.status(200).json(Exam);

    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:name",async(req,res)=>{
    try{
        const Exam=await examFunction.deleteExam(req.params.name);
        res.status(200).json(Exam)
    }catch(error){
        res.status(400).json(error);
    }
})

module.exports=router;