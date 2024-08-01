const express=require("express");
const router=express.Router();
const classModel=require("../functions/classFunction");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.post("/", authenticateToken, authorizeAdmin, async(req,res)=>{
    try{
        const classes=await classModel.createClasses(req.body);
        res.status(200).json(classes)
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/" ,authenticateToken, async(req,res)=>{
    try{
        const classes=await classModel.getClasses();
        res.status(200).json(classes)
    }catch(error){
        res.status(400).json(error);
    }

})

router.get("/:name", authenticateToken, async(req,res)=>{
    try{
        
        const classes=await classModel.getClassesById(req.params.name);
        res.status(200).json(classes)
    }catch(error){
        console.log(error)
        res.status(400).json(error);
    }

})

router.put("/:name", authenticateToken, authorizeAdmin, async(req,res)=>{
    try{
        const classes=await classModel.updateClasses(req.params.name,req.body);
        res.status(200).json(classes);

    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:name", authenticateToken, authorizeAdmin, async(req,res)=>{
    try{
        const classes=await classModel.deleteClasses(req.params.name);
        res.status(200).json(classes)
    }catch(error){
        res.status(400).json(error);
    }
})

module.exports=router;