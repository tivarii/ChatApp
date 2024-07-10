import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from "../models/models";
import bcryptjs from 'bcryptjs';
dotenv.config();
export const checkPassword = async (req:any, res:any) => {
    try {
        const { userId, password } = req.body;
        const user = await UserModel.findById(userId);
        console.log(user);
        const verifyPassword = (user) ? user.password : "";
        const verfication = await bcryptjs.compare(password, verifyPassword + "");
        if (!verfication) {
            return res.status(502).json({
                message: "invalid password",
                error: true
            })
        }
        const email=(user)?user.email:"";
        const payload={
            user_id:userId,
            email:email
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET+"");
        const cookiesOption={
            http:true,
            secure:true
        }
        return res.cookie("token",token,cookiesOption).status(200).json({
            message:"Successfull",
            token:token,
            success:true
        })

    } catch (error:any) {
        return res.status(502).json({
            message:error.message||error,
            error:true
        })
    }

}