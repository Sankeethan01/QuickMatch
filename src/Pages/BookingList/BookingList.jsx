import React from "react";
import "./BookingList.css";
import PageTitle from "../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { bookingRow } from "../../DummyData";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import Button from "@mui/material/Button";
import Popup from "../../components/AdminDashBoardComponents/PopupBookingDetail/Popup";
import AdminNavbar from "../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";

const BookingList = () => {
  const [data, setData] = useState(bookingRow);
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

  const selectedRowData = bookingRow.find((row) => row.id === dataId);

  const columns = [
    { field: "id", headerName: "BookingID", width: 100 },

    { field: "service", headerName: "Service", width: 200 },
    {
      field: "customer",
      headerName: "Customer",
      width: 180,
    },
    {
      field: "provider",
      headerName: "Provider",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
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
    <div className="booking-list">
      <AdminNavbar />
      {modalOpen && selectedRowData && (
        <Popup data={selectedRowData} onclose={handleclosePopup} />
      )}

      <PageTitle heading="Service Bookings" />
      <div className="booking-table">
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
          disableRowSelectionOnClick
          checkboxSelection
          className="table-grid"
        />
      </div>
    </div>
  );
};

export default BookingList;
