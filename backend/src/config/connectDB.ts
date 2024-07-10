import mongoose from "mongoose";
const MONGO_URL=process.env.MONGO_URL || "";
export const ConnectDB= async ()=>{
    try{
        
        await mongoose.connect("mongodb+srv://admin:Adarsh%4054321@cluster0.sdybxas.mongodb.net/chatApp");
        const connection = await mongoose.connection;
        connection.on('connected',()=>{
            console.log("connection is on");
        });
        connection.on('error',(error)=>{
            console.log("mongo connect error"+ error)
        })

    }catch(err){
        console.log("not able to mongoDB ",err);
    }
};