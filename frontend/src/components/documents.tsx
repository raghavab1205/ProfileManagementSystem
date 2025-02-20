import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGridPro, GridColDef, GridCellParams, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarExport, GridToolbarDensitySelector } from "@mui/x-data-grid-pro";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from "react-router-dom";
import './datatable.css';


//const APILink = "http://localhost:5000/api/documents"

// Define an interface for your document data
interface DocumentData {
    sln : number;
    doc_id: string;
    filename: string;
    fileSize: number;
    uploadedAt: string;
}

const DocumentGrid: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/documents"); // Ensure backend port is correct
            console.log("Fetched Documents:", response.data); // Debug API response
            setDocuments(response.data.data); // Verify if response.data is an array
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const rows1 = documents.map((doc, index) => ({
        sln: index + 1,
        doc_id: doc.doc_id,
        filename: doc.filename,
        fileSize: doc.fileSize, // Ensure API returns the correct case
        uploadedAt: doc.uploadedAt,
    }));

    console.log("Rows Data:", rows1); // Debug mapped data

    const handleDownload = (id: string) => {
        window.open(`http://localhost:5000/api/documents/${id}`, "_blank");
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //     await axios.delete(`http://localhost:5000/api/documents/${id}`);
    //     fetchDocuments();
    //     } catch (error) {
    //     console.error("Error deleting document:", error);
    //     }
    // };

    const handleDelete = async (filename: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/documents/${filename}`);
            console.log("Delete success:", response.data);
            alert("File deleted successfully!");
            fetchDocuments();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // ✅ AxiosError handling
                console.error("Axios error:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Failed to delete file.");
            } else if (error instanceof Error) {
                // ✅ Generic JavaScript error
                console.error("Error deleting file:", error.message);
                alert("An unexpected error occurred.");
            } else {
                // ✅ Fallback for unknown errors
                console.error("Unknown error:", error);
                alert("Something went wrong.");
            }
        }
    };

    const columns: GridColDef[] = [
        { field: "sln", headerName: "SL_NO", width: 75 },
        { field: "doc_id", headerName: "Document ID", width:148 },
        { field: "filename", headerName: "Filename", width: 150 },
        { field: "fileSize", headerName: "Size (bytes)", width: 200 },
        {
        field: "uploadedAt",
        headerName: "Uploaded At",
        width: 75 
        },
        {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (params: GridCellParams<DocumentData>) => (
            <>
            {/* <button className = 'editicon' onClick={() => handleDownload(params.row.doc_id)}>Download</button>
            <button className="delicon" onClick={() => handleDelete(params.row.doc_id)}>Delete</button> */}
            <Tooltip title='Delete profile'>
              <IconButton
                onClick = {() => handleDelete(params.row.filename)}
              >
                <DeleteIcon className="delicon"/>
              </IconButton>
            </Tooltip>
              <Tooltip title='Edit Profile'>
              <IconButton 
                onClick={() => handleDownload(params.row.filename)}
              >
                <DownloadIcon className = 'editicon'/>
              </IconButton>
            </Tooltip>
            </>
        ),
        },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // const handleChangePage = (
    //     _event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number,
    // ) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     setRowsPerPage(parseInt(event.target.value, 5));
    //     setPage(0);
    // };

    const CustomToolbar = () => (
        <GridToolbarContainer className= "custom-toolbar">
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      );

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 650, width: 750 }}>
            {/* uplaod doc */}
            <Box className = 'datatable' sx={{/*display: 'flex', justifyContent: 'initial',*/ width: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'initial'}}>
                    <h1 style={{ fontSize: '16px', textAlign: 'left', color: 'white' }}>
                        USER DOCUMENTS MANAGMENT DATAGRID
                    </h1>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Tooltip title="Back To Home page">
                        <HomeRoundedIcon className="homebutton" onClick = {() => {navigate("/")}}/>
                    </Tooltip>
                </Box>
            </Box>

            <Box className= 'datatable' sx={{display: 'flex', flexDirection: 'column', height: 500, width: '100%'}}>
                {/* <Box className = "pagination-container" sx = {{width: '100%'}}>
                    <TablePagination
                        component="div"
                        count={documents.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box> */}

                {/* Doc datagrid */}
                <Box>
                    <DataGridPro 
                    className="tablebg" 
                    rows={rows1} 
                    columns={columns} 
                    getRowId={(row) => row.doc_id}
                    pagination // ✅ Enable pagination explicitly
                    autoPageSize={false}
                    pageSizeOptions={[5, 10, 20]}
                    paginationModel={{ page, pageSize: rowsPerPage }} // ✅ Use paginationModel
                    onPaginationModelChange={(model) => {
                        setPage(model.page);
                        setRowsPerPage(model.pageSize);
                    }}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnSorting
                    disableColumnResize
                    slots={{ toolbar: CustomToolbar }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default DocumentGrid;
