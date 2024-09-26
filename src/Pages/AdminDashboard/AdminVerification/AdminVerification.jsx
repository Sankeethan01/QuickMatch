import React, { useEffect } from "react";
import "./AdminVerification.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import Button from '@mui/material/Button';
import PopupVerification from "../../../components/AdminDashBoardComponents/PopupVerfication/PopupVerification";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import axios from "axios";
import logo from '../../../assets/logo.png';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminVerification = () => {
  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [verifications,setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(()=>{
    if(sessionStorage.getItem('user_type') !== 'admin')
      {
           sessionStorage.clear();
            navigate('/');
      }
      setTimeout(() => {
        fetchVerifications();
      }, 2000);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);


const fetchVerifications = async () => {
  try {
    const response = await axios.get('http://localhost/quickmatch_api/getAllVerifications.php?action=getAll');

    const categoryMapping = {
      S01: 'Electric',
      S02: 'Electronic',
      S03: 'Construction',
      S04: 'Event Management',
    };

    const transformedData = response.data.map((verification) => ({
      id: verification.verify_id,
      description: verification.description,
      proof: verification.proof,
      address: verification.provider_address,
      email: verification.provider_email,
      name: verification.provider_name,
      username: verification.provider_username,
      date: verification.registered_date,
      service_category: categoryMapping[verification.service_category] || verification.service_category,
      services:verification.services,
    }));
    setVerifications(transformedData);
  } catch (error) {
    console.log("Error fetching verification details:");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this data?");
  if (confirmDelete) {
    try {
      // Send ID as a URL parameter
      const response = await axios.delete(`http://localhost/quickmatch_api/deleteVerification.php?id=${id}`);
      console.log(response.data);
    
      setVerifications(verifications.filter((message) => message.id !== id));
      toast.success("Verification data deleted Successfully.");
    } catch (error) {
      console.error("Error deleting message: ", error);
      toast.error("Failed to delete verification data.");
    }
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

  const selectedRowData = verifications.find(row => row.id === dataId);



  const columns = [
    { field: "id", headerName: "VerifyID", width: 140 },

    { field: "name", headerName: "Provider Name", width: 250 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "date",
      headerName: "Registered Date",
      width: 250,
    },
    {
      field: "service_category",
      headerName: "Service",
      width: 250,
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage === 0 ? 'first-row' : ''
            }
              rows={verifications}
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
              rowHeight={60}
              columnHeaderHeight={60}
            />
          </div>
          <ToastContainer />
    </div>
  );
};

export default AdminVerification;
