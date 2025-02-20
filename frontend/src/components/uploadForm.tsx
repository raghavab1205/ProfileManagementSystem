import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Tooltip } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Swal from "sweetalert2";  // ✅ Import SweetAlert2
import "./datatable.css";

interface UploadFormProps {
  refreshDocuments: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ refreshDocuments }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("✅ Upload success:", response.data);

      // ✅ Show success alert
      Swal.fire({
        icon: "success",
        title: "Upload Successful!",
        text: `File "${selectedFile.name}" uploaded successfully.`,
        confirmButtonColor: "#4caf50",
        customClass: {
          popup: 'popupclass'
        }
      });

      setSelectedFile(null);
      refreshDocuments();
      setOpen(false); // ✅ Close the dialog after upload
    } catch (error) {
      console.error("❌ Upload error:", error);

      // ❌ Show error alert
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: "An error occurred while uploading. Please try again.",
        confirmButtonColor: "#d32f2f",
        customClass: {
          popup: 'popupclass'
        }
      });
    }
  };

  return (
    <div>
      <Box sx = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative"}}>
      <Box sx = {{position: "absolute", top: 20, right: 20}}>
      <HomeRoundedIcon className="homebutton" onClick={() => window.location.href = "/"}/>
      </Box>  
      <Box className="datatable" sx={{ width: "100%", textAlign:"center"}}>
        <button onClick={() => setOpen(true)} className="formbutton">Open Upload Form</button>
        <Dialog className="formclass" open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <form className="formcl" onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <Tooltip title="Upload File">
              <button className="formbutton" type="submit">Upload</button>
            </Tooltip>
          </form>
        </Dialog>
      </Box>
      </Box>
    </div>
  );
};

export default UploadForm;
