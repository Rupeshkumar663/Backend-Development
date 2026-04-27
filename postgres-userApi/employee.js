import pkg from "pg";
import dotenv, { config } from "dotenv"
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
      const result=await pool.query('INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING *',[name, email])
      res.status(200).json({
        message:"data fetch successfully ",
        data:result.rows[0]
     })
  } catch(error){
    console.log(error)
    res.status(500).json({ message: "server error" });
  }
}


