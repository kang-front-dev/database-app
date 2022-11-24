import React, { useState, useEffect } from 'react';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { IconButton } from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { url } from '../connection';
export interface IUser {
  name?: string;
  _id?: string
  password: string;
  email: string;
  regDate?: string;
  logDate: string;
  statusBlock?: number;
}

interface IAction {
  method: 'block' | 'unblock' | 'delete';
}

export default function Table() {
  const [userData, setUserData] = useState([]);
  const [usersGenerated, setUsersGenerated] = useState(false);
  const [checked, setChecked] = useState(Array<GridRowId>);

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 270, sortable: false },
    { field: 'name', headerName: 'name', width: 200, sortable: false },
    { field: 'email', headerName: 'email', width: 250, sortable: false },
    {
      field: 'regDate',
      headerName: 'regDate',
      width: 210,
      sortable: false,
    },
    {
      field: 'logDate',
      headerName: 'logDate',
      width: 210,
      sortable: false,
    },
    {
      field: 'statusBlock',
      headerName: 'status',
      width: 80,
      sortable: false,
    },
  ];

  useEffect(() => {
    fetch(`${url}/getAll`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setUsersGenerated(true);
        setUserData(data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersGenerated]);

  function actWithChecked(action: IAction) {
    if (action.method === 'block') {
      checked.forEach((userId) => {
        fetch(`${url}/blockUser`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({ _id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              return false;
            }
            return response.json();
          })
          .catch((err) => console.log(err.message));

        if (localStorage.getItem('id') === userId) {
          localStorage.removeItem('id');
          localStorage.removeItem('email');
          localStorage.removeItem('isAuth');
          navigate('/');
        }
      });
    } else if (action.method === 'unblock') {
      checked.forEach((userId) => {
        fetch(`${url}/unblockUser`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({ _id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              return false;
            }
            return response.json();
          })
          .catch((err) => console.log(err.message));
        if (localStorage.getItem('id') === userId) {
          localStorage.removeItem('id');
          localStorage.removeItem('email');
          localStorage.removeItem('isAuth');
          navigate('/');
        }
      });
    } else if (action.method === 'delete') {
      checked.forEach((userId) => {
        fetch(`${url}/deleteUser`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'DELETE',
          body: JSON.stringify({ _id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              return false;
            }
            return response.json();
          })
          .catch((err) => console.log(err.message));
        if (localStorage.getItem('id') === userId) {
          localStorage.removeItem('id');
          localStorage.removeItem('email');
          localStorage.removeItem('isAuth');
          navigate('/');
        }
      });
    }
  }

  return (
    <div style={{ height: 700, width: '100%', marginTop: '20px' }}>
      <div className="table_buttons">
        <IconButton
          color="error"
          onClick={() => {
            actWithChecked({ method: 'block' });
            setUsersGenerated(false);
          }}
        >
          <LockTwoToneIcon />
        </IconButton>
        <IconButton
          color="success"
          onClick={() => {
            actWithChecked({ method: 'unblock' });
            setUsersGenerated(false);
          }}
        >
          <LockOpenTwoToneIcon />
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => {
            actWithChecked({ method: 'delete' });
            setUsersGenerated(false);
          }}
        >
          <DeleteForeverTwoToneIcon />
        </IconButton>
      </div>
      {localStorage.getItem('isAuth') ? (
        <DataGrid
          rows={userData}
          getRowId={(rows)=> rows._id}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          hideFooterPagination
          hideFooter
          hideFooterSelectedRowCount
          onSelectionModelChange={(ids) => {
            console.log(ids);
            setChecked(ids);
          }}
        />
      ) : (
        'U have to login or reg'
      )}
    </div>
  );
}
