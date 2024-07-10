 import mongoose, { Model } from "mongoose";
 import { UserModel } from "../models/models";
 import jwt from "jsonwebtoken";
 import bcryptjs from "bcryptjs";
 import { CookieOptions } from "express";
 export const registerUser=async(req:any,res:any)=>{
    try {
        const {name,email,password,profile_pic} = req.body;
        const checkUser=await UserModel.findOne({email});
        if(checkUser){
            return res.status(200).json({
                msg:"User already exist",
                error:true
            })
        }
        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt);
        const newUser=new UserModel({name,email,password:hashPassword,profile_pic});
        const user=await newUser.save();
        const payload={
            user_id:user._id,
            email:email
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET+"");
        const cookiesOption={
            http:true,
            secure:true
        }
        return res.status(200).cookie("token",token,cookiesOption).json({
            msg:"User created successfully",
            data:token,
            success:true
        });
        
    } catch (error:any) {
        return res.status(500).json({
            msg: error.message || error,
            error:true,
        });
    }
 }