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

/*export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({
         include:{
            comment:{
               include:{
                  user:true
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
/*export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({
         include:{
            comment:{
               include:{
                  user:{
                     select:{
                        name:true
                     }
                  }
               }
            }
         },
         orderBy:{
            id:"desc"
         },
         where:{
            comment_count:{
               gt:6
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
/*
export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({
         include:{
            comment:{
               include:{
                  user:{
                     select:{
                        name:true
                     }
                  }
               }
            }
         },
         orderBy:{
            id:"desc"
         },
         where:{
            title:{
            startwith:"web",
               endsWith:"Indian",
               equals:"Dubai"
            }
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
} */
/*

export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({
         include:{
            comment:{
               include:{
                  user:{
                     select:{
                        name:true
                     }
                  }
               }
            }
         },
         orderBy:{
            id:"desc"
         },
         where:{
            OR:[
               {
                 title:{
                  startsWith:"web"
                 }
               },
               {
                 title:{
                  endsWith:"Indian"
                 }
               }
            ]
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
*/

/*
export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({
         include:{
            comment:{
               include:{
                  user:{
                     select:{
                        name:true
                     }
                  }
               }
            }
         },
         orderBy:{
            id:"desc"
         },
         where:{
            AND:[
               {
                 title:{
                  startsWith:"web"
                 }
               },
               {
                 title:{
                  endsWith:"Indian"
                 }
               }
            ]
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}*/

/*export const getallpost=async(req,res)=>{
   try {
       const data=await prisma.post.findMany({
         include:{
            comment:{
               include:{
                  user:{
                     select:{
                        name:true
                     }
                  }
               }
            }
         },
         orderBy:{
            id:"desc"
         },
         where:{
            NOT:[
               {
                 title:{
                  startsWith:"web"
                 }
               }
            ]
         }
       })
        return res.status(200).json({message:"data fetch successfully",data})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }
}
 */

export const getallpost=async(req,res)=>{
   try {
      let page=Number(req.query.page) ||1
      let limit=Number(req.query.limit) ||10
      if(page<0){
         page=1;
      }
      if(limit<0 || limit>100){
         limit=10;
      }
      const skip=(page-1)*limit;
       const data=await prisma.post.findMany({
         skip:skip,
         take:limit,
         include:{
            comment:{
               include:{
                  user:{
                     select:{
                        name:true
                     }
                  }
               }
            }
         },
         orderBy:{
            id:"desc"
         }
         
       })
       //to get the totla post count-------------
       const totalposts=await prisma.post.count();
       const totalpages=Math.ceil(totalposts/limit);
        return res.status(200).json({message:"data fetch successfully",data,
         meta:{
            totalpages,
            limit:limit,
            currentPage:page
         }
        })
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


export const searchPost=async(req,res)=>{
   try {
      const query=req.query.q//url ke under pass krne bale ko q bolrhe hain.//query=dubai
      const posts=await prisma.post.findMany({
      where:{
         description:{
            search:query
         }
      }
    })
     res.status(200).json({message:"I get your all posts",data:posts})
   } catch(error){
       console.log(error)
       return res.status(201).json({message:"server error",error});
   }

}

