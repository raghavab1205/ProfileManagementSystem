import path from "path";
import { readdir,  stat, unlink, access } from 'node:fs/promises';
import { unlinkSync } from "node:fs";

export const getDocuments = async (req, res) => {
    try {
        const directory = "./backend/USERDOCS";
        const files = await readdir(directory); // Read files asynchronously

        const fileDetails = await Promise.all(
            files.map(async (file, index) => {
                const filepath = path.join(directory, file);
                const stats = await stat(filepath); // Get file metadata

                return {
                    doc_id: `doc-${index+1}`,
                    filename: file,
                    filepath: filepath,
                    fileSize: stats.size, // File size in bytes
                    uploadedAt: stats.birthtime || stats.mtime, // File creation/modification time
                };
            })
        );

        res.status(200).json({ success: true, data: fileDetails });
    } catch (error) {
        console.error(`Error in fetching documents: ${error.message}`);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const addDocument = async (req, res) => {
    try {
        console.log("📥 Request Body:", req.body);
        console.log("📂 Received File:", req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        console.log("✅ File received:", req.file);

        const documentData = {
            filename: req.file.originalname,
            filepath: path.resolve(req.file.path), // Get absolute path
            fileSize: req.file.size,
            uploadedAt: new Date(),
        };

        console.log("📂 File stored locally:", documentData);

        res.status(201).json({ success: true, data: documentData });
    } catch (error) {
        console.error("❌ Error in addDocument:", error.message);

        // If file was uploaded but an error occurs, delete the file
        if (req.file) {
            try {
                unlink(req.file.path);
                console.log("🗑️ File deleted due to an error");
            } catch (err) {
                console.error("❌ File deletion failed:", err);
            }
        }

        res.status(500).json({ success: false, message: "Server error", details: error.message });
    }
};


export const deleteDocument = async (req, res) => {
    const filename = decodeURIComponent(req.params.filename); // Get filename from URL
    const filePath = path.join("./backend/USERDOCS", filename);

    try {
        // ✅ Check if file exists
        await access(filePath); 

        // ✅ Delete the file
        await unlink(filePath);
        console.log(`File deleted: ${filePath}`);

        res.status(200).json({ success: true, message: "File deleted successfully." });
    } catch (error) {
        console.error(`Error in deleting file: ${error.message}`);
        res.status(404).json({ success: false, message: "File not found." });
    }
};

export const downloadDocument = async (req, res) => {
    const id = decodeURIComponent(req.params.filename);
    const filepath = path.join("./backend/USERDOCS", id);
    try {
        // ✅ Ensure file exists before attempting download
        await access(filepath);

        res.download(filepath, id);
    } catch (error) {
        console.error(`Error in downloading document: ${error.message}`);
        res.status(500).json({ success: false, message: "Server error." });
    }
};