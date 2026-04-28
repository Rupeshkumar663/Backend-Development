import pkg from "pg";
import dotenv from "dotenv"
dotenv.config()
const { Pool } = pkg;
const pool=new Pool({
    user:process.env.user,
    host:"localhost",
    database:"postgres-user",
    password:process.env.password,
    port:5432
})


export const createemployee=async(req,res)=>{
   try{
      const {name,email}=req.body 
      if(!name ||!email){
        return res.status(404).json({message:"please fill all fields"});
      }
      const result=await pool.query('INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING *',[name,email])
      res.status(200).json({
        message:"data fetch successfully ",
        data:result.rows[0]
     })
  } catch(error){
    console.log(error)
    res.status(500).json({ message: "server error" });
  }
}

export const getalls=async(req,res)=>{
  try {
      const result=await pool.query('SELECT * FROM employees')
      if(!result){
        return res.status(404).json({message:"data not found"});
      }
      return res.status(200).json({
        message:"all data gets successfully",
        data:result.rows
      })
  } catch(error){
    console.log(error)
    res.status(500).json({message:"server error"});
  }
}

export const getemployeebyid=async(req,res)=>{
  try {
    const id=parseInt(req.params.id)
    const result=await pool.query(`SELECT * FROM employees WHERE id=$1`,[id]);
     if(!result){
        return res.status(404).json({message:"data not found"});
       }
       return res.status(200).json({
        message:"get data successfully",
        data:result.rows[0]
      })
  } catch(error){
    console.log(error)
    res.status(500).json({message:"server error"});
  }
}

export const updateemployees=async(req,res)=>{
  try {
    const id=parseInt(req.params.id)
    const {name,email}=req.body
     if(!name ||!email){
        return res.status(404).json({message:"no update"});
      }
     await pool.query(`UPDATE employees SET name=$1 ,email=$2 WHERE id=$3`,[name,email,id]);
      return res.status(200).json({message:"update successfully"})
  } catch(error){
    console.log(error)
    res.status(500).json({message:"server error"});
  }
}


export const deleteemployee=async(req,res)=>{
  try {
    const id=parseInt(req.params.id)
    await pool.query(`DELETE  FROM employees WHERE id=$1`,[id]);
    return res.status(200).json({message:"delete  successfully"})
  } catch(error){
    console.log(error)
    res.status(500).json({message:"server error"});
  }
}
