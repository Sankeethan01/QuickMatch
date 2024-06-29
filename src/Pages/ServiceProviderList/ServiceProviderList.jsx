import React from 'react'
import './ServiceProviderList.css'
import PageTitle from '../../components/AdminDashBoardComponents/PageTitle/PageTitle'
import { providerRows } from '../../DummyData'
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import Button from '@mui/material/Button';
import PopupProvider from '../../components/AdminDashBoardComponents/PopupProviderDetails/PopupProvider'
import AdminNavbar from '../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar'

const ServiceProviderList = () => {

  const [data, setData] = useState(providerRows);
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

    const selectedRowData = providerRows.find(row => row.id === dataId);


  const columns = [
      { field: "id", headerName: "ProviderID", width: 130 },
      {
           field: 'provider', 
           headerName: 'Provider', 
           width: 200 ,
           renderCell: (params) => {
              return (
                <div className="userListUser">
                  <img className="userListImg" src={params.row.avatar} alt="" />
                  {params.row.username}
                </div>
              );
            },
          },
      { field: 'email', headerName: 'Email', width: 200 },
      {
        field: 'service',
        headerName: 'Service',
        width: 200,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
       
      },
      {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className='table-action'>
                 <Button variant="contained" className='action-button' onClick={() => {
                    handleViewClick(params.row.id);
                    setModalOpen(true);
                }}>View</Button>
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
    <div className='service-provider-list'>
           <AdminNavbar />
           {modalOpen && selectedRowData && (<PopupProvider data={selectedRowData}  onclose={handleclosePopup}/>)}
      
          <PageTitle heading='Service Providers' />
          <div className='provider-table'>
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
        className='table-grid'
      />
    </div> 
       
    </div>
  )
}

export default ServiceProviderList