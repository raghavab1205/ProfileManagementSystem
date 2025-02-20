import { addDocument, deleteDocument, downloadDocument, getDocuments } from "../controllers/documentController.js";
import express from "express";
import multer from 'multer';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Parse URL-encoded requests
const __filename = fileURLToPath(import.meta.url);
const backendDir = path.dirname(__filename);
const uploadDir = path.join(backendDir, "../USERDOCS");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create if missing
  console.log("📁 Created missing upload directory:", uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log("📁 Saving file to:", uploadDir);
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      console.log("📄 Received file:", file.originalname);
      cb(null, Date.now() + "-" + file.originalname);
  },
});
  
const upload = multer({ storage });

const router = express.Router();

router.use(express.urlencoded({ extended: true })); 

router.get("/", getDocuments);

router.post("/", upload.single("file"), addDocument);

router.delete("/:filename", deleteDocument);

router.get("/:filename", downloadDocument);

export default router;