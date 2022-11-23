import React from 'react';
import FormLog from '../components/Logform';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logpage() {
  return (
    <>
      <Link to="/">
        <Button variant="contained" color="error">Back</Button>
      </Link>
      <FormLog></FormLog>
    </>
  );
}
