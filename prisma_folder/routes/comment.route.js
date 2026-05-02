import { Router } from "express";
import { commentdelete, createcomment, getallcomment, getcomment, updatecomment } from "../controllers/comment.controller.js";

const router=Router()
router.post("/commentcreate",createcomment)
router.put("/commentupdate/:id",updatecomment)
router.get("/:id",getcomment)
router.get("/comment",getallcomment)
router.delete("/deletecomments/:id",commentdelete)
export default router