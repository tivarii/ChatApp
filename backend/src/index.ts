import  express  from "express";
import dotenv from "dotenv";
import Router from "./routes/routes";
import { ConnectDB } from "./config/connectDB";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
dotenv.config();
const PORT = process.env.PORT || 8080;

const app=express();
app.use(cookieParser());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("server is hosted at "+PORT);
    
})
app.use("/api/v1/",Router);

app.listen(PORT,()=>{
    console.log("listening at "+PORT);
});
ConnectDB();
