import mongoose from "mongoose";
const OrderItemsSchema=mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number
    }
})
const orderSchema=mongoose.Schema({
    orderprice:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.type.ObjectId,
        ref:"User",
    },
    orderItems:{
       type:[OrderItemsSchema],
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING"
    }
},{Timestamps:true})
export const Order=mongoose.model("Order",orderSchema)