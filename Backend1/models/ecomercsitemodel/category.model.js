import mongoose  from "mongoose";
const categorySchema=mongoose.Schema({
    name:String,
    required:true,
},
{Timestamps:true})
export const Category=mongoose.model("Category",categorySchema);
 