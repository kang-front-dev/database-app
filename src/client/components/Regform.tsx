import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { IUser } from './Table';
import { useNavigate } from 'react-router-dom'
import {url} from '../connection'

export default function FormReg() {
  let name: string, email: string, password: string;
  const navigate = useNavigate()

  function insertData(userData: IUser) {
    console.log(JSON.stringify(userData));
    
    return fetch(`${url}/insert`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData),
    }).then((response) => {
      if(!response.ok){
        return false
      }
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
        label="Name"
        onInput={(e) => {
          name = (e.target as HTMLInputElement).value;
        }}
      />

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
          console.log(name, email, password);
          if(name && email && password){
            const today = getToday();
            const response = await insertData({
              name: name,
              email: email,
              password: password,
              regDate: today,
              logDate: today,
              statusBlock: 0,
            });
            console.log(response,'response');
            if(response.success){
              localStorage.setItem('email',response.email)
              localStorage.setItem('id',response.id)
              localStorage.setItem('isAuth','1')
              navigate('/table')
            }
          }
        }}
      >
        Register
      </Button>
    </Box>
  );
}

export function getToday() {
  const date = new Date();
  const currentDate = date.toLocaleDateString().split('.').reverse().join('-');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  const today = `${currentDate} ${time}`;
  return today;
}
