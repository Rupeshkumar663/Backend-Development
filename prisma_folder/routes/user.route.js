import { Router } from "express";
import { getallusers, getuser, register, updateuser, userdelete } from "../controllers/user.controller.js";
const router=Router()

router.post("/register",register)
router.put("/update/:id",updateuser)
router.get("/getdata/:id",getuser)
router.get("/getalldata",getallusers)
router.delete("/deleteuser/:id",userdelete)
export default router