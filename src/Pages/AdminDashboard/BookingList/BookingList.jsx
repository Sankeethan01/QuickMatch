import React, { useEffect, useState } from "react";
import "./BookingList.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import Button from "@mui/material/Button";
import Popup from "../../../components/AdminDashBoardComponents/PopupBookingDetail/Popup";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import logo from '../../../assets/logo.png';
import { useNavigate } from "react-router-dom";

const BookingList = () => {

  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [bookings,setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(sessionStorage.getItem('user_type') !== 'admin')
      {
           sessionStorage.clear();
            navigate('/');
      }
      setTimeout(()=>{
        fetchBookings();
      },2000)
  
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const fetchBookings = async () => {
  try{
   const response = await axios.get('http://localhost/quickmatch_api/getAllBookings.php?action=getAll');
   console.log('Raw data: ',response.data);
   setLoading(false);


   const transformedData = response.data.map((booking,index)=>(
     {
       id:booking.booking_id,
       service: booking.service_type,
       date: booking.booking_date,
       customer: booking.customer_name,
       provider: booking.provider_name,
       status: booking.booking_status,

     }
   ))
  
 console.log('Transformed Data: ',transformedData);
 setBookings(transformedData);

 }
  

  catch(error){
   console.error('Error fetching bookings:',error);
   setLoading(false)
  }
};

if(loading){
  return <div className="loading">
    <img src={logo} alt=""/>
    <h4>Loading......</h4>
  </div>
}



  const handleViewClick = (id) => {
    setDataId(id);
    setModalOpen(true);
  };

  const handleclosePopup = () => {
    setModalOpen(false);
  };

  const selectedRowData = bookings.find((row) => row.id === dataId);

  const columns = [
    { field: "id", headerName: "BookingID", width: 130 },
    {
      field: "service",
      headerName: "Service Category",
      width: 250,
    },
    { field: "date", headerName: "Booked Date", width: 150 },
    {
      field: "customer",
      headerName: "Customer",
      width: 230,
    },
    {
      field: "provider",
      headerName: "Provider",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
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

      <PageTitle heading="Service Booking" />
      <div className="booking-table">
        <DataGrid  getRowClassName={(params) =>
          params.indexRelativeToCurrentPage === 0 ? 'first-row' : ''
        }
          rows={bookings}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
          className="table-grid"
          rowHeight={60}
          columnHeaderHeight={60}
        />
      </div>
    </div>
  );
};

export default BookingList;
