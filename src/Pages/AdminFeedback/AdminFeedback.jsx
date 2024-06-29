import React, { useState } from 'react'
import './AdminFeedback.css'
import PageTitle from '../../components/AdminDashBoardComponents/PageTitle/PageTitle'
import { dataFeedback } from '../../DummyData'
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PopupFeedback from '../../components/AdminDashBoardComponents/PopupFeedback/PopupFeedback'
import AdminNavbar from '../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar'

const AdminFeedback = () => {

  const [data, setData] = useState(dataFeedback);
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
  
    const selectedRowData = dataFeedback.find(row => row.id === dataId);

  const columns = [
      { field: "id", headerName: "FeedbackID", width: 150 },
  
      { field: 'user', headerName: 'User', width: 200 },
      {
        field: 'username',
        headerName: 'Username',
        width: 180,
      },
      {
          field: 'email',
          headerName: 'Email',
          width: 180,
        },
      {
        field: 'date',
        headerName: 'Date',
        width: 200,
       
      },
      {
          field: "action",
          headerName: "Action",
          width: 180,
          renderCell: (params) => {
            return (
              <div className='table-action'>
                 <Button variant="contained" className='action-button' 
                 onClick={() => {
                  handleViewClick(params.row.id);
                  setModalOpen(true);
              }} >View</Button>
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
    <div className='admin-feedback'>
          <AdminNavbar />
          {modalOpen && selectedRowData && (<PopupFeedback data={selectedRowData}  onclose={handleclosePopup}/>)}
     
            <PageTitle heading='User Feedbacks'/>
            <div className='feedback-table'><DataGrid
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
    className='table-grid'
  /></div>
      
    </div>
  )
}

export default AdminFeedback