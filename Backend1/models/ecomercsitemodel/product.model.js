import mongoose  from "mongoose";
import { Category } from "./category.model";
const productSchema=mongoose.Schema({
    name:{
        name:String,
        required:true,
    },
    productImage:{
        type:String,
    },
    color:{
        type:String,
    },
    price:{
        type:Number,
        default:0,
    },
    stock:{
        type:Number,
        default:0,
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

},{Timestamps:true})
export const Product=mongoose.model("Product",productSchema);