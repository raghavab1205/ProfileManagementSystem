import { GridColDef, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
// import { Box } from "@mui/material";
import { DataGridPro } from '@mui/x-data-grid-pro';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { GridRenderCellParams } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton, Tooltip, FormHelperText } from "@mui/material";
// import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import './datatable.css';
import TablePagination from '@mui/material/TablePagination';
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid-pro";
import axios from "axios";


const API_URL = "http://localhost:5000/api/profiles";

const MyComponent = () => {
  type user = {
    sln:number,
    user_id: string;
    name: string;
    email: string;
    age: number;
  };

  const [rows,setRows] = useState<user[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const columns: GridColDef[] = [
    { 
      field: "sln", 
      headerName: "SL_NO",
      width: 75
    },
    {
      field:"user_id",
      headerName:"User ID",
      width:148 
    },
    { 
      field: "name", 
      headerName: "Name", 
      type: "string",
      width: 150 
    },
    { 
      field: "email", 
      headerName: "Email", 
      type: "custom",
      width: 200 
    },
    { 
      field: "age", 
      headerName: "Age", 
      type: "number",
      width: 75 
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
  
      renderCell: (params) => {
        return (
          <>
            <Tooltip title='Delete profile'>
              <IconButton
                onClick = {() => handleDelete(params.row.user_id)}
              >
                <DeleteIcon className="delicon"/>
              </IconButton>
            </Tooltip>
              <Tooltip title='Edit Profile'>
              <IconButton 
                onClick={() => openDialog(params.row)}
              >
                <EditIcon className = 'editicon'/>
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
  ];

  const rows1= rows.map((user,index)=>{
    return {
      sln:index + 1,
      user_id:user.user_id,
      name :user.name,
      email:user.email,
      age:user.age,
    }
  });

  const fetchProfiles = async () => {
    axios.get(API_URL) // Fetch from Express API
    .then(response => {
      setRows(response.data.data); // Set response data to state
    })
    .catch(error => console.error("Error fetching profiles:", error));
  };

  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<user | null>(null);

  //Validation Schema for Formik
  const validationSchema = Yup.object({
    user_id: Yup.string().required("  !!  User ID is required  !!  "),
    name: Yup.string().required("  !!  Name is required  !!  "),
    email: Yup.string().email("  !!  Invalid email format  !!  ").required("  !!  Email is required  !!  "),
    age: Yup.number().typeError("  !!  Age must be a number  !!  ").required("  !!  Age is required  !!  "),
  });

  // Open Dialog for Adding or Editing
  const openDialog = (row: user | null = null) => {
    setEditingRow(row);
    setOpen(true);
  };
  
  function handleDelete(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'popupclass'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        fetchProfiles();
        Swal.fire({
          title: "Deleted!", 
          text: "The row has been deleted.", 
          icon: "success",
          customClass: {
            popup: 'popupclass'
          }
        });
      }
    });
  }

  const handleSubmit = async (values: user, { resetForm }: any) => {
    if (editingRow) {
      // Edit existing row
      console.log("editing", editingRow)      //setRows((prevRows) => prevRows.map((row) => (row.id === editingRow.id ? { ...values, id: editingRow.id } : row)));
      axios.put(`${API_URL}/${values.user_id}`, values);
    } else {
      // Add new row
      //setRows((prevRows) => [...prevRows, { ...values, id: prevRows.length + 1 }]);
      axios.post(`${API_URL}`, values);
    }
    fetchProfiles();
    resetForm();
    setOpen(false);

  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      {/* Button Box */}
      <Box className = 'datatable' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <Box sx={{display: 'flex', justifyContent: 'initial'}}>
          <h1 style={{ fontSize: '16px', textAlign: 'left', color: 'white' }}>
            PROFILE MANAGMENT DATAGRID
          </h1>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "end", gap: 2 }}>
          <Tooltip title=" Back To Home page">
            <HomeRoundedIcon className="homebutton" onClick = {() => { navigate("/") }}/>
          </Tooltip>
          <Tooltip title="Add New Profile">
            <button onClick={() => openDialog(null)} className="addicon"> 
              +ADD 
            </button>
          </Tooltip>
        </Box>
      </Box>

      {/* DataGrid Box */}
      <Box className = 'datatable' sx={{display: 'flex', flexDirection: 'column', height: 500, width: '100%'}}>
        <Box className = "pagination-container" sx = {{width: '100%'}}>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <Box>
          <DataGridPro 
            className="tablebg" 
            rows={rows1} 
            columns={columns} 
            //rowCount={rows.length}
            getRowId={(row) => row.sln /*|| Math.random()*/}
            pageSizeOptions={[10, 25, 50]} 
            paginationModel={{ page, pageSize: rowsPerPage }} // ✅ Correct Usage
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setRowsPerPage(model.pageSize);
            }}
            disableRowSelectionOnClick
            disableColumnMenu
            //disableColumnFilter
            disableColumnSorting
            disableColumnResize
            slots={{ toolbar: CustomToolbar }}
          />
          <Dialog className = "formclass" open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{editingRow ? "Edit Row" : "Add New Row"}</DialogTitle>
              <Formik initialValues={editingRow || { sln: 0, user_id:"", name: "", email: "", age: 0 }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched, handleChange, values }) => (
                <Form className = "form-class">
                  <DialogContent>
                  <Field as={TextField} label="USER ID" name="user_id" fullWidth margin="dense" error={touched.user_id && Boolean(errors.user_id)} onChange={handleChange} value={values.user_id} />
                  <ErrorMessage name="name" component={FormHelperText} className="error-message" />
                    <Field as={TextField} label="Name" name="name" fullWidth margin="dense" error={touched.name && Boolean(errors.name)} onChange={handleChange} value={values.name} />
                    <ErrorMessage name="name" component={FormHelperText} className="error-message" />
                    <Field as={TextField} label="Email" name="email" type="email" fullWidth margin="dense" error={touched.email && Boolean(errors.email)} onChange={handleChange} value={values.email} />
                    <ErrorMessage name="email" component={FormHelperText} className="error-message" />
                    <Field as={TextField} label="Age" name="age" type="number" fullWidth margin="dense" error={touched.age && Boolean(errors.age)} onChange={handleChange} value={values.age} />
                    <ErrorMessage name="age" component={FormHelperText} className="error-message" />
                  </DialogContent>
                  <DialogActions>
                    <Button className = "formcanbutton" onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button className = "formsubbutton" type="submit" color="primary">{editingRow ? "Update" : "Add"}</Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default MyComponent