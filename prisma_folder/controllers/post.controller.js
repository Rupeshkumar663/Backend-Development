import prisma from "../db.js"

export const createpost=async(req,res)=>{
   try{
     const {user_id,title,description}=req.body
     if( !title|| !description){
        return res.status(401).json({message:"please fill all fields"});
     }
     
     const newpost=await prisma.post.create({
        data:{
            user_id:Number(user_id),
            title,
            description
        }
     });
      return res.status(200).json({message:"post successfully",newpost});
   } catch(error){
        return res.status(200).json({message:"server error",error});
   }
}

export const updatepost=async(req,res)=>{
   try {
      const postId=req.params.id//post=1
      const {user_id,title,description}=req.body
      await prisma.post.update({
         where:{
            id:Number(postId)//userid=1
         },
         data:{
            user_id:Number(user_id),
            title,
            description
        }
      })
      return res.status(200).json({message:"post update successfully"})
   } catch(error){
      console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const getpost=async(req,res)=>{
   try {
       const postId=req.params.id
       const data=await prisma.post.findUnique({
         where:{
            id:Number(postId)
         }
       })
        return res.status(200).json({message:"post fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({})
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const postdelete=async(req,res)=>{
   try {
       const postId=req.params.id
       await prisma.post.delete({
         where:{
            id:Number(postId)
         }
       })
        return res.status(200).json({message:"post delete successfully"})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}