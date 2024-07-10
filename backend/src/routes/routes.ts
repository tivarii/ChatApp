import express from "express";
import { registerUser } from "../controllers/registerUser";
import { checkEmail } from "../controllers/checkEmail";
import { checkPassword } from "../controllers/checkPassword";
import { userDetail } from "../controllers/userDetail";
import { logout } from "../controllers/logout";
import { update } from "../controllers/update";

const Router=express.Router();

Router.post("/registerUser",registerUser);
Router.post("/email",checkEmail);
Router.post("/password",checkPassword)
Router.get("/user-detail",userDetail);
Router.post("/logout",logout);
Router.post("/update",update);
// Router.get("/",(req,res)=>{
//     res.send("I am here");
// })

export default Router;