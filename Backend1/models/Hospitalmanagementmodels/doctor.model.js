import mongoose from "mongoose";
const doctorSchema=mongoose.Schema({},{Timesatamps:true})
export const Doctor=mongoose.model("Doctor",doctorSchema)