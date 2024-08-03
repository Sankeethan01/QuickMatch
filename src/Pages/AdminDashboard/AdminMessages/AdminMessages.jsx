import React, { useEffect, useState } from "react";
import "./AdminMessages.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PopupMessage from "../../../components/AdminDashBoardComponents/PopupMessage/PopupMessage";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import axios from "axios";
import logo from '../../../assets/logo.png';

const AdminMessages = () => {
  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    axios
      .get("http://localhost/quickmatch_api/messages.php")
      .then((response) => {
        console.log(response.data);
       
        
        setLoading(false);

        const transformedData = response.data.map((message, index) => ({
           id : message.message_id,
           message : message.message,
           name : message.name,
           email : message.email,
           date: message.date,
        }));

        console.log("Transformed Data: ", transformedData);
        setMessages(transformedData);
        
      })
      .catch((error) => {
        console.error("Error fetching  feedbacks : ", error);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    if (confirmDelete) {
      try {
        const response = await axios.delete('http://localhost/quickmatch_api/messages.php', {
          data: { id: id }
        });
        console.log(response.data);
      
        setMessages(messages.filter((message) => message.id !== id));
        alert("Data deleted successfully");
      } catch (error) {
        console.error("Error deleting message: ", error);
      }
    }
  };


  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }
  



  const handleViewClick = (id) => {
    setDataId(id);
    setModalOpen(true);
  };

  const handleclosePopup = () => {
       setModalOpen(false);
  };

  const selectedRowData = messages.find(row => row.id === dataId);


  const columns = [
    { field: "id", headerName: "MessageID", width: 200 },

    {
      field: "name",
      headerName: "Name",
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
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage === 0 ? 'first-row' : ''
            }
              rows={messages}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 7 },
                },
              }}
              pageSizeOptions={[7, 10,15]}
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

export default AdminMessages;
