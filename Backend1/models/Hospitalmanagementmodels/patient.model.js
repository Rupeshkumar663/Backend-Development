import mongoose from "mongoose";
const patientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    disease:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    weight:{
        type:String,
        required:true,
    },
    bllodGroup:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","others"],
        required:true,
    }
},{Timesatamps:true})
export const Patient=mongoose.model("Patient",patientSchema)