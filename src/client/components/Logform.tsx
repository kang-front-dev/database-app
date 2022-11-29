import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { IUser } from './Table';
import { useNavigate } from 'react-router-dom';
import { getToday } from './Regform';
import { url } from '../connection';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function FormLog() {
  let email: string, password: string;
  const navigate = useNavigate();

  function login(userData: IUser) {
    console.log(JSON.stringify(userData));

    return fetch(`${url}/authUser`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
      .then((response) => {
        console.log(response, 'response from log');
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
      style={{
        maxWidth: '260.39px',
        width: '100%',
      }}
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
      <Grid container columns={10} spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={7}>
          <Button
            variant="contained"
            style={{width: '100%'}}
            onClick={async () => {
              console.log(email, password);
              if (email && password) {
                const today = getToday();
                const response = await login({
                  email: email,
                  password: password,
                  logDate: today,
                });
                console.log(response, 'response');
                if (response.success) {
                  localStorage.setItem('token', response.token);
                  localStorage.setItem('email', response.email);
                  localStorage.setItem('id', response.id);
                  localStorage.setItem('isAuth', '1');
                  navigate('/table');
                } else {
                  handleClick(response.message);
                }
              } else if (!email && !password) {
                handleClick('Please complete the form');
              } else if (!password) {
                handleClick('Password required');
              } else if (!email) {
                handleClick('Email required');
              }
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>

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
