const express=require("express");
const router=express.Router();

const User=require("../models/userModel");
const userModel=require("../functions/userFunction");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken");

router.post("/login",async(req,res)=>{
    try{
        const {username, password}=req.body;
        if(username==="" || !password===""){
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user=await User.findOne({username});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        
        const isPasswordValid=await bcrypt.compare(password,user.password);
       
        if(!isPasswordValid)
            return res.status(400).json({error:"Invalid username or password"});

        const payload={
            username:user.username,
            role:user.role
        }
        const token=jwt.sign(payload ,process.env.SECRET_KEY,{expiresIn:'120m'});

        user.token=token;
        await user.save();

        res.cookie('token',token,{httpOnly:true, secure:true, maxAge:60*60*1000, sameSite:'None'});
        res.status(200).json({success:"Login Success",username:user.username});

    }catch(error){
        res.status(400).json({error:"Error logging in",error})
    }
})

router.post("/logout",authenticateToken, async(req,res)=>{
    try{
        const user= await userModel.logout(req.cookies.token);
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }catch(error){
        res.status(400).json(error);
    }
})



router.post("/", authenticateToken, authorizeAdmin, async(req,res)=>{
    try{
        const result=await userModel.createUser(req.body);
        res.status(200).json(result)
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/", authenticateToken, async(req,res)=>{
    try{
        const result=await userModel.getUser();
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({error:"error"})
        }
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:username", authenticateToken, async(req,res)=>{
    try{
        const result=await userModel.getUserById(req.params.username);
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({error:"error"})
        }
    }catch(error){
        res.status(400).json(error);
    }
})

router.put("/:username", authenticateToken, authorizeAdmin, async(req,res)=>{
    try{
        const result=await userModel.updateUser(req.params.username,req.body);
        res.status(200).json(result)

    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:username", authenticateToken, authorizeAdmin, async(req,res)=>{
    try{
        const result=await userModel.deleteUser(req.params.username);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json(error);
    }
})


module.exports=router;