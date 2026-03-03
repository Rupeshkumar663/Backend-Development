import mongoose from "mongoose";
const hospitalSchema=mongoose.Schema({},{Timesatamps:true})
export const Hospital=mongoose.model("Hospital",hospitalSchema)