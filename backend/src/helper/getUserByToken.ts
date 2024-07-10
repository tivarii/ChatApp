import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { UserModel } from '../models/models';
dotenv.config();
export const getUserByToken = async (token: string) => {
    try {
        interface JwtPayload {
            user_id: string;
            username: string;
            // Add other fields if necessary
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET + "") as JwtPayload;
        // console.log(decode);
        const user = await UserModel.findById(decode.user_id).select('-password') || "";
        // console.log(user);
        return user;

    } catch (error) {
        return {msg:"some internal error"};
    }
}