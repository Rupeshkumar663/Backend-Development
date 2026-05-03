import prisma from "../db.js"

export const createcomment=async(req,res)=>{
   try{
     const {user_id,post_id,comment}=req.body
     await prisma.post.update({
      where:{
         id:Number(post_id)
      },
      data:{
         comment_count:{
            increment:1
         }
      }
     })
    
     const newcomment=await prisma.comment.create({
        data:{
            user_id:Number(user_id),
            post_id:Number(post_id),
            comment
        }
     });
      return res.status(200).json({message:"comment successfully",newcomment});
   } catch(error){
        return res.status(200).json({message:"server error",error});
   }
}

export const updatecomment=async(req,res)=>{
   try {
      const commentId=req.params.id//post=1
      const {user_id,post_id,comment}=req.body
      await prisma.comment.update({
         where:{
            id:String(commentId)
         },
         data:{
           user_id:Number(user_id),
            post_id:Number(post_id),
            comment
        }
      })
      return res.status(200).json({message:"comment update successfully"})
   } catch(error){
      console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const getcomment=async(req,res)=>{
   try {
       const commentId=req.params.id
       const data=await prisma.comment.findUnique({
         where:{
            id:String(commentId)
         }
       })
        return res.status(200).json({message:"comment fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const getallcomment=async(req,res)=>{
   try {
       const data=await prisma.comment.findMany({})
        return res.status(200).json({message:"all comments fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const commentdelete=async(req,res)=>{
   try {
       const commentId=req.params.id
        await prisma.post.update({
      where:{
         id:Number(post_id)
      },
      data:{
         comment_count:{
            decrement:1
         }
      }
     })
       await prisma.comment.delete({
         where:{
            id:String(commentId)
         }
       })
        return res.status(200).json({message:"comment delete successfully"})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}