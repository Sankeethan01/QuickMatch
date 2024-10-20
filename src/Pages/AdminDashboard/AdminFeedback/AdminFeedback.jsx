import React, { useEffect, useState } from "react";
import "./AdminFeedback.css";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PopupFeedback from "../../../components/AdminDashBoardComponents/PopupFeedback/PopupFeedback";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import axios from "axios";
import logo from '../../../assets/logo.png';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";

const AdminFeedback = () => {
  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('user_type') !== 'admin')
      {
           sessionStorage.clear();
            navigate('/');
      }
      setTimeout(() => {
        fetchFeedbacks();
      }, 2000);
   //react-hooks/exhaustive-deps
  }, [navigate]);
  

  const fetchFeedbacks = async () => {
    axios
      .get("http://localhost/quickmatch_api/getAllFeedbacks.php?action=getAll")
      .then((response) => {
        console.log(response.data);
        setLoading(false);

        const transformedData = response.data.map((feedback, index) => ({
          id: feedback.feedback_id,
          user_type: feedback.user_type,
          email: feedback.email,
          feedback: feedback.feedback,
          date: feedback.date,
          name: feedback.name,
        }));

        console.log("Transformed Data: ", transformedData);
        setFeedbacks(transformedData);
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
        const response = await axios.delete(`http://localhost/quickmatch_api/deleteFeedback.php?id=${id}`);
        console.log(response.data);
      
        setFeedbacks(feedbacks.filter((message) => message.id !== id));
        toast.success("Feedback data deleted Successfully..");
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

  const selectedRowData = feedbacks.find((row) => row.id === dataId);

  const columns = [
    { field: "id", headerName: "FeedbackID", width: 200 },

    { field: "user_type", headerName: "User", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
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
    <>
    <div className="admin-feedback">
      <AdminNavbar />
      {modalOpen && selectedRowData && (
        <PopupFeedback data={selectedRowData} onclose={handleclosePopup} />
      )}

      <PageTitle heading="User Feedbacks" />
      <div className="feedback-table">
        <DataGrid
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage === 0 ? 'first-row' : ''
        }
          rows={feedbacks}
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
    <Footer />
    </>
  );
};

export default AdminFeedback;
