import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { IUser } from './Table';
import { useNavigate } from 'react-router-dom'
import { getToday } from './Regform';

export default function FormLog() {
  let email: string, password: string;
  const navigate = useNavigate()

  function login(userData: IUser) {
    console.log(JSON.stringify(userData));
    
    return fetch('http://localhost:5000/authUser', {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(userData),
    }).then((response) => {
      console.log(response,'response from log');
      return response.json();
    }).catch(err=>console.log(err.message,'ERROR'));
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="on"
      className="form"
    >
      <TextField
        required
        autoComplete="on"
        type="email"
        label="Email"
        onInput={(e) => {
          email = (e.target as HTMLInputElement).value;
        }}
      />
      <TextField
        required
        type="password"
        autoComplete="on"
        label="Password"
        onInput={(e) => {
          password = (e.target as HTMLInputElement).value;
        }}
      />
      <Button
        variant="contained"
        onClick={async () => {
          console.log(email, password);
          const today = getToday()
          const response = await login({
            email: email,
            password: password,
            lastLoginDate: today,
          });
          console.log(response,'response');
          if(response.success){
            localStorage.setItem('token',response.token)
            localStorage.setItem('email',response.email)
            localStorage.setItem('id',response.id)
            localStorage.setItem('isAuth','1')
            navigate('/table')
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
}

