const express=require("express");
const router=express.Router();
const subjectModel=require("../functions/subjectFunction")
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.post("/", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.createSubject(req.body);
        res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.getSubject();
        res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:id", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.getSubjectById(req.params.id);
        res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})

router.put("/:id", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.updateSubject(req.params.id, req.body);
        res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.deleteSubject(req.params.id);
        res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})



router.get("/class/subjectbyclass", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.getSubjectByClass(req.body.class_id);
        if(!subject){
            res.status(404).json({error:"Subject Not Found"})
          }
          res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})

router.post("/class/subjectbyclass", authenticateToken, async(req,res)=>{
    try{
        const subject=await subjectModel.createSubjectByClass(req.body);

        if(!subject){
            res.status(404).json({error:"Subject Not Found"})
          }
          res.status(200).json(subject);
    }catch(error){
        res.status(400).json(error);
    }
})


module.exports=router;