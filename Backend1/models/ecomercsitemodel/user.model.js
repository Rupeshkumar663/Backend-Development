import mongoose  from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    

},{Timestamps:true})
export default mongoose.model("User",userSchema);
 //const User=mongoose.model("User",userSchema);
 //export default User
//export const User=mongoose.model("User",userSchema);
//users