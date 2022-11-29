import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/reg">
        <Button variant="contained">Register</Button>
      </Link>
      <Link to="/log">
        <Button variant="contained" style={{ marginLeft: '10px' }}>
          Login
        </Button>
      </Link>
    </header>
  );
}
