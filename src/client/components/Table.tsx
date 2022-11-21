import React, { useState, useEffect } from 'react';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { IconButton } from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

export interface IUser {
  name?: string;
  id?: number;
  password: string;
  email: string;
  regDate?: string;
  lastLoginDate: string;
  status?: number;
}
export interface IUserXML {
  name: string;
  id: number;
  password?: string;
  email: string;
  reg_date: string;
  log_date: string;
  status_block: number;
}

interface IAction {
  method: 'block' | 'unblock' | 'delete';
}

export default function Table() {
  const [userData, setUserData] = useState([]);
  const [usersGenerated, setUsersGenerated] = useState(false);
  const [checked, setChecked] = useState([]);

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'name', headerName: 'name', width: 130, sortable: false },
    { field: 'email', headerName: 'email', width: 190, sortable: false },
    {
      field: 'reg_date',
      headerName: 'regDate',
      width: 210,
      sortable: false,
    },
    {
      field: 'log_date',
      headerName: 'logDate',
      width: 210,
      sortable: false,
    },
    {
      field: 'status_block',
      headerName: 'status',
      width: 80,
      sortable: false,
    },
  ];

  useEffect(() => {
    fetch('http://localhost:5000/getAll')
      .then((response) => response.json())
      .then((data) => {
        setUsersGenerated(true);
        setUserData(data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersGenerated]);

  function actWithChecked(action: IAction) {
    console.log(checked, action);
    if (action.method === 'block') {
      checked.forEach((userId) => {
        fetch('http://localhost:5000/blockUser', {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({ id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              return false;
            }
            return response.json();
          })
          .catch((err) => console.log(err.message));
        if (Number(localStorage.getItem('id')) === userId) {
          localStorage.removeItem('id');
          localStorage.removeItem('email');
          localStorage.removeItem('isAuth')
          navigate('/form');
        }
      });
    } else if (action.method === 'unblock') {
      checked.forEach((userId) => {
        fetch('http://localhost:5000/unblockUser', {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({ id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              return false;
            }
            return response.json();
          })
          .catch((err) => console.log(err.message));
          if (Number(localStorage.getItem('id')) === userId) {
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('isAuth')
            navigate('/form');
          }
      });
    } else if (action.method === 'delete') {
      checked.forEach((userId) => {
        fetch('http://localhost:5000/deleteUser', {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'DELETE',
          body: JSON.stringify({ id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              return false;
            }
            return response.json();
          })
          .catch((err) => console.log(err.message));
          if (Number(localStorage.getItem('id')) === userId) {
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('isAuth')
            navigate('/form');
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
      {localStorage.getItem('isAuth') ? <DataGrid
        rows={userData.map((item: IUserXML) => {
          item.reg_date = item.reg_date.split('T').join(' ');
          const regArr = item.reg_date.split('');
          regArr.splice(19, 5);
          item.reg_date = regArr.join('');
          item.log_date = item.log_date.split('T').join(' ');
          const logArr = item.log_date.split('');
          logArr.splice(19, 5);
          item.log_date = logArr.join('');
          return item;
        })}
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
      /> : 'U have to login or reg'}
    </div>
  );
}
