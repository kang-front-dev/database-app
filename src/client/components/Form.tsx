import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  let [userAuth, setUserAuth] = useState(false);
  const navigate = useNavigate();
  async function checkToken() {
    return await fetch('http://localhost:5000/checkToken', {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    }).then((res) => {
      console.log(res, 'response then');

      if (res.ok) {
        setUserAuth(true);
        navigate('/table');
      }
    });
  }
  if (!userAuth && localStorage.getItem('token')) {
    checkToken();
  }
  console.log(userAuth, 'userAuth');

  return (
    <>
      <Header />
    </>
  );
}
