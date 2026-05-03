import prisma from "../db.js"

export const register=async(req,res)=>{
   try{
     const {name,email,password}=req.body
     if(!name || !email|| !password){
        return res.status(401).json({message:"please fill all fields"});
     }
     const exist=await prisma.user.findUnique({
        where:{
            email:email
        }
     })
     if(exist){
        return res.status(401).json({message:"user already exists"});
     }

     const createuser=await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
     })
      return res.status(200).json({message:"register successfully",createuser});
   } catch(error){
        return res.status(200).json({message:"server error",error});
   }
}

export const updateuser=async(req,res)=>{
   try {
      const userId=req.params.id
      const {name,email,password}=req.body

      await prisma.user.update({
         where:{
            id:Number(userId)//userid=1
         },
         data:{
            name:name,
            email:email,
            password:password
        }
      })
      return res.status(200).json({message:"update successfully"})
   } catch(error){
      console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}

export const getuser=async(req,res)=>{
   try {
       const userId=req.params.id
       const data=await prisma.user.findUnique({
         where:{
            id:Number(userId)
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
/*export const getallusers=async(req,res)=>{
   try {
       const data=await prisma.user.findMany({
         include:{
            post:true,
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
 */
/*export const getallusers=async(req,res)=>{
   try {
       const data=await prisma.user.findMany({
         include:{
            post:{
               select:{
                  title:true,
                  comment_count:true
               }
            }
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
*/
/*export const getallusers=async(req,res)=>{
   try {
       const data=await prisma.user.findMany({
         select:{
            _count:{
               select:{
                  post:true,
                  comment:true
               }
            }
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
*/
/*export const getallusers=async(req,res)=>{
   try {
       const data=await prisma.user.findMany({
         include:{
            post:{
               select:{
                  title:true,
                  comment_count:true
               }
            }
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
} */
export const getallusers=async(req,res)=>{
   try {
       const data=await prisma.user.findMany({
         include:{
            post:{
               include:{
                  comment:true
               }
            }
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
export const userdelete=async(req,res)=>{
   try {
       const userId=req.params.id
       await prisma.user.delete({
         where:{
            id:Number(userId)
         }
       })
        return res.status(200).json({message:"data delete successfully"})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}