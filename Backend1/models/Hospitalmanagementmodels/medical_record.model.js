import mongoose from "mongoose";
const medicalRecordSchema=mongoose.Schema({},{Timesatamps:true})
export const MedicalRecord=mongoose.model(" MedicalRecord",medicalRecordSchema)