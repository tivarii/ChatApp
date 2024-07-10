import mongoose,{mongo, Schema,Model} from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength: 8
    },
    profile_pic:{
        type:String,
        require:true
    }

},{
    timestamps:true
}
);
const conversationSchema= new Schema({
    sender:{type:String,require:true,ref:'User'},
    receiver:{type:String,require:true,ref:'User'},
    message:[{
        type:String,
        ref:'Message'
    }]
},{
    timestamps:true
})

const messageSchema = new Schema({
    text:{type:String,default:""},
    imageURL:{type:String,default:""},
    videoURL:{type:String,default:""},
    seen:{type:Boolean}
},{
    timestamps:true
})

export const UserModel=mongoose.model("User",userSchema);
export const ConversationModel= mongoose.model("Conversation",conversationSchema);
export const MessageModel= mongoose.model("Message",messageSchema);