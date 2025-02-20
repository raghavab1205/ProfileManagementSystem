import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    doc_id: {
        type: String,
        required: true
    },
    filename: { 
        type: String, 
        required: true 
    },
    filepath: { 
        type: String, 
        required: true 
    },
    fileSize: Number,
    uploadedAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;