import React, { useEffect } from "react";
import "./CustomerList.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import Button from "@mui/material/Button";
import PopupCustomer from "../../../components/AdminDashBoardComponents/PopupCustomerDetails/PopupCustomer";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import axios from "axios";
import logo from '../../../assets/logo.png';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
 
  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [customers,setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(()=>{
    if(sessionStorage.getItem('user_type') !== 'admin')
      {
           sessionStorage.clear();
            navigate('/');
      }
    fetchCustomers();
},[]);

const fetchCustomers = async () => {
  axios.get('http://localhost/quickmatch_api/getAllCustomers.php?action=getAll')
  .then(response => {
    
    console.log(response.data);
    setLoading(false)

    const transformedData = response.data.map((customer,index)=>(
      {
        id:customer.user_id,
        name: customer.name,
        username:customer.username,
        email:customer.email,
        phone:customer.phone,
        address:customer.address,
        profile_image:customer.profile_image,
        national_id:customer.national_id,
 
      }
    ))

    console.log('Transformed Data: ',transformedData);
    setCustomers(transformedData);
  })
  .catch(error => {
    console.error('Error fetching  customers: ', error);
    setLoading(false);
  })
}



const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this customer data?");
  if (confirmDelete) {
    try {
      const response = await axios.delete('http://localhost/quickmatch_api/customerDetails.php', {
        data: { id: id }
      });
      console.log(response.data);
    
      setCustomers(customers.filter((message) => message.id !== id));
      toast.success("Customer data deleted Successfully..");
    } catch (error) {
      console.error("Error deleting message: ", error);
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

  const selectedRowData = customers.find((row) => row.id === dataId);

  const columns = [
    { field: "id", headerName: "UserID", width: 150 },
    {
      field: "name",
      headerName: "Customer",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={`http://localhost/quickmatch_api/profile_images/${params.row.profile_image}`} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "phone",
      headerName: "Contact No",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
        <DataGrid  getRowClassName={(params) =>
          params.indexRelativeToCurrentPage === 0 ? 'first-row' : ''
        }
          rows={customers}
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
      <ToastContainer />
    </div>
  );
};

export default CustomerList;
