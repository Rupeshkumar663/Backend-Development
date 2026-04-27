import pkg from "pg";
const { Pool }=pkg;
const pool=new Pool({
  user:process.env.DB_USER,
  host:process.env.DB_HOST,
  database:process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
});

export const createemployee=(req,res)=>{
    const {name,email}=req.body;

    pool.query('INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING *',[name,email], (err,result)=>{
         if(err){
            console.log(err)
            throw err
         }
         res.status(200).json({
            message:"data created successfully",
            data:result.rows[0],//yaha result.id,result.email,result.name is tarah se bhi likh sakte hain.
         })
        });//agar returning sbkuch chahte hain to start de dete hain.dynamic parameter array me jata hai.next parameter me error and result jata hai


}