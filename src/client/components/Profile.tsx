import React, { SetStateAction } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import {useNavigate } from 'react-router-dom';
export interface IPropsAuth {
  states: {
    userAuth: boolean;
    setUserAuth: React.Dispatch<SetStateAction<boolean>>;
  };
}

export default function Profile() {

  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
      <Avatar>U</Avatar>
      <Chip label={localStorage.getItem('email')}></Chip>
      <Button
        variant="text"
        onClick={() => {
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          localStorage.removeItem('id')
          localStorage.removeItem('isAuth')
          navigate('/')
        }}
      >
        logout
      </Button>
    </div>
  );
}
