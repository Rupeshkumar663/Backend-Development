import mongoose from "mongoose"
const todoSchema=mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    complete:{
        type:Boolean,
        default:false
    },
    createedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    }
},
{timestamps: true}
)
export const Todo=mongoose.model("Todo",todoSchema)
//todos