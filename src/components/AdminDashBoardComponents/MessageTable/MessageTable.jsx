import React, { useState } from 'react'
import './MessageTable.css'
import { dataMessage } from '../../../DummyData';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const MessageTable = () => {

    const [data, setData] = useState(dataMessage);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
      };

    const columns = [
        { field: "id", headerName: "MessageID", width: 200 },
    
        {
          field: 'username',
          headerName: 'Username',
          width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
          },
        {
          field: 'date',
          headerName: 'Date',
          width: 200,
         
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
              return (
                <div className='table-action'>
                   <Button variant="contained" className='action-button'><Link to={"/adminbookings/" + params.row.id} className='button-link'>View</Link></Button>
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
    <div className='message-table'><DataGrid
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
  )
}

export default MessageTable