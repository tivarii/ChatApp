import { getUserByToken } from "../helper/getUserByToken";
import cookieParser from "cookie-parser";

export const userDetail = async (req: any, res: any) => {
    try {
        const token = req.cookies.token;
        console.log("token is "+token);
        
        if(!token){
            return res.status(502).json({
                msg:"token not present.please login"
            })
        }
        const user= await getUserByToken(token);
        return res.status(200).json({
            msg:"User Details",
            data:user
        })
    } catch (error) {
        return res.status(502).json({
            msg:"User not found"+error
        })
    }
};