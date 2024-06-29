import React from "react";
import "./CustomerList.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { userRows } from "../../../DummyData";
import { useState } from "react";
import Button from "@mui/material/Button";
import PopupCustomer from "../../../components/AdminDashBoardComponents/PopupCustomerDetails/PopupCustomer";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";

const CustomerList = () => {
  const [data, setData] = useState(userRows);
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

  const selectedRowData = userRows.find((row) => row.id === dataId);

  const columns = [
    { field: "id", headerName: "CustomerID", width: 200 },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "services_got",
      headerName: "Services got",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="table-action">
            <Button
              variant="contained"
              className="action-button"
              onClick={() => {
                handleViewClick(params.row.id);
                setModalOpen(true);
              }}
            >
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
    <div className="customer-list">
      <AdminNavbar />
      {modalOpen && selectedRowData && (
        <PopupCustomer data={selectedRowData} onclose={handleclosePopup} />
      )}

      <PageTitle heading="Customers" />
      <div className="customer-table">
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

export default CustomerList;
