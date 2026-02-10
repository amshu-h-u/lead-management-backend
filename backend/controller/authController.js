const userModel=require("../models/UserModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
       const existinguser=await userModel.findOne({email:email})
       if(existinguser){
           return res.status(400).json({message:"User already registered"})
       }
       const hashedPassword=await bcrypt.hash(password,10);
       const user=new userModel({
        name,email,password:hashedPassword,role
       })
       await user.save();
       res.status(201).json({message:"User registered successfully"})
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
       const user=await userModel.findOne({email:email})
       if(!user){
        return res.status(404).json({message:"User not found"})
       }
       const isPasswordMatch=await bcrypt.compare(password,user.password);
       if(!isPasswordMatch){
        return res.status(401).json({message:"Inavalid credentials"})
       }
       const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})
       res.status(200).json({message:"Login successfull",token});
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports={register,login};