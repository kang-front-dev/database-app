import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, {useState} from 'react';
import { IUser } from './Table';
import { useNavigate } from 'react-router-dom';
import { url } from '../connection';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function FormReg() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  function insertData(userData: IUser) {
    console.log(JSON.stringify(userData));

    return fetch(`${url}/insert`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData),
    })
      .then((response) => {
        console.log(response,'respopopop');
        
        return response.json();
      })
      .catch((err) => console.log(err.message, 'ERROR'));
  }

  const [open, setOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');

  const handleClick = (message: string) => {
    setSnackMessage(message);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
          setName((e.target as HTMLInputElement).value)
        }}
      />

      <TextField
        required
        autoComplete="on"
        type="email"
        label="Email"
        onInput={(e) => {
          setEmail((e.target as HTMLInputElement).value)
        }}
      />
      <TextField
        required
        type="password"
        autoComplete="on"
        label="Password"
        onInput={(e) => {
          setPassword((e.target as HTMLInputElement).value)
        }}
      />
      <Button
        variant="contained"
        onClick={async () => {
          console.log(name, email, password);

          if (name && email && password) {
            const today = getToday();
            const response = await insertData({
              name: name,
              email: email,
              password: password,
              regDate: today,
              logDate: today,
              statusBlock: 0,
            });
            console.log(response, 'response');
            if (response.success) {
              localStorage.setItem('email', response.email);
              localStorage.setItem('id', response.id);
              localStorage.setItem('isAuth', '1');
              navigate('/table');
            }else{
              handleClick(response.message);
            }
          } else if (!name && !email && !password) {
            handleClick('Please complete the form');
          } else if (!password) {
            handleClick('Password required');
          } else if (!email) {
            handleClick('Email required');
          } else if (!name) {
            handleClick('Name required');
          }
        }}
      >
        Register
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackMessage}
        action={action}
      />
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
