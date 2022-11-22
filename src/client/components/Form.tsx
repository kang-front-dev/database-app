import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  let [userAuth, setUserAuth] = useState(false);
  const navigate = useNavigate();
  async function checkToken() {
    return await fetch('https://database-app-server-production.up.railway.app/checkToken', {
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
