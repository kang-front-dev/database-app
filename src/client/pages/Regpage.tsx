import React from 'react';
import FormReg from '../components/Regform';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Regpage() {
  return (
    <>
      <Link to="/">
        <Button variant="contained" color="error">
          Back
        </Button>
      </Link>
      <FormReg></FormReg>
    </>
  );
}
