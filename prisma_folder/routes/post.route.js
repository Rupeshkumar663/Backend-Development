import { Router } from "express";
import { createpost, getallpost, getpost, postdelete, updatepost } from "../controllers/post.controller.js";

const router=Router()
router.post("/postcreate",createpost)
router.put("/postupdate/:id",updatepost)
router.get("/:id",getpost)
router.get("/getallposts",getallpost)
router.delete("/deletepost/:id",postdelete)
export default router