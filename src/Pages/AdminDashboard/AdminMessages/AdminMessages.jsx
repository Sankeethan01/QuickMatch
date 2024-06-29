import React, { useState } from "react";
import "./AdminMessages.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { dataMessage } from "../../../DummyData";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PopupMessage from "../../../components/AdminDashBoardComponents/PopupMessage/PopupMessage";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";

const AdminMessages = () => {
  const [data, setData] = useState(dataMessage);
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

  const selectedRowData = dataMessage.find(row => row.id === dataId);


  const columns = [
    { field: "id", headerName: "MessageID", width: 200 },

    {
      field: "username",
      headerName: "Username",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
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
    <div className="admin-messages">
      <AdminNavbar />
      {modalOpen && selectedRowData && (<PopupMessage data={selectedRowData}  onclose={handleclosePopup}/>)}
      
          <PageTitle heading="Messages" />
          <div className="message-table">
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

export default AdminMessages;
