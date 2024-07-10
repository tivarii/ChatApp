import express from "express"
import { UserModel } from "../models/models";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

export const checkEmail=async(req:express.Request,res:express.Response)=>{
    try {
        const {email}=req.body;
        const user=await UserModel.findOne({email}).select('-password');
        if(!user){
            return res.status(502).json({
                message:"user not present please signup",
                error:true
            })
        }
        const salt=await bcryptjs.genSalt(10);
        const payload={
            user_id:user._id,
            email:email
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET+"");
        const cookiesOption={
            http:true,
            secure:true
        }
        return res.cookie("token",token,cookiesOption).status(200).json({
            msg:"user present",
            data:user,
            success:true
        })

    } catch (error:any) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}