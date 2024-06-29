import React from "react";
import "./AdminVerification.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { dataVerify } from "../../../DummyData";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import Button from '@mui/material/Button';
import PopupVerification from "../../../components/AdminDashBoardComponents/PopupVerfication/PopupVerification";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";

const AdminVerification = () => {
  const [data, setData] = useState(dataVerify);
  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleViewClick = (id) => {
    setDataId(id);
    setModalOpen(true);
  };

  const handleclosePopup = () => {
       setModalOpen(false);
  };

  const selectedRowData = dataVerify.find(row => row.id === dataId);



  const columns = [
    { field: "id", headerName: "VerificationID", width: 200 },

    { field: "provider", headerName: "Provider", width: 200 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "date",
      headerName: "Date of Register",
      width: 200,
    },
    {
      field: "service",
      headerName: "Service",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="table-action">
            <Button variant="contained" className="action-button" onClick={() => {
                    handleViewClick(params.row.id);
                    setModalOpen(true);
                }}>
              
                View
             
            </Button>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="admin-verify">
      <AdminNavbar />
      {modalOpen && selectedRowData && (<PopupVerification data={selectedRowData}  onclose={handleclosePopup}/>)}
      
          <PageTitle heading="Service Provider Verification" />

          <div className="verification-table">
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              checkboxSelection
              disableRowSelectionOnClick
              className="table-grid"
            />
          </div>
    
    </div>
  );
};

export default AdminVerification;
