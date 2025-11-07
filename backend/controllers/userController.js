import user from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser=async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const existingUser=await user.findOne({email})
    if(existingUser){
        return res.status(400).json({"message":"User Already Exists"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=new user({
        name,
        email,
        password:hashedPassword,
    })
    await newUser.save()
    return res.status(201).json({"message":"Registration Successful"})
}
catch(err){
        console.log(err)
    return res.status(500).json({"message":"Server Error"})
}
}
export const loginUser=async(req,res)=>{
    try {
        const {email,password,rememberMe}=req.body;
        const User=await user.findOne({email})
        if(!User){
            return res.status(400).json({"message":"No such user Found"})
        }
        const cmpPassword=await bcrypt.compare(password,User.password)
        if(!cmpPassword){
         return res.status(400).json({"message":"Email or Password Wrong"})
        }
        const session = jwt.sign(
            {id:User._id,email:User.email}
            ,process.env.JWT_SECRET_KEY,{
            expiresIn:"10d"
        })
        res.cookie("token",session,{
            httpOnly:true,
              maxAge: rememberMe ? 30*24*60*60*1000 : 24*60*60*1000,
              sameSite:"none",
              secure:true
        })
        return res.status(200).json({"message":'Login Successful'})
    } catch (error) {
        return res.status(500).json({"message":"Server Error"})
    }
}
