import express from "express";
import { addProfile, deleteProfile, editProfile, getProfiles } from "../controllers/productController.js";

const router = express.Router();

router.use(express.json());

router.get("/", getProfiles);
 
 router.post("/", addProfile);
 
 router.put("/:user_id", editProfile);
 
 router.delete("/:user_id", deleteProfile);

export default router;