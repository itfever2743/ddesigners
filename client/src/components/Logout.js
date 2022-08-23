import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const LogoutDone = () => {
    fetch('/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        dispatch({ type: 'USER', payload: false });
        navigate('/login');
        if (res.status === 200) {
          console.log('logged Out');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    LogoutDone();
  });
  return (
    <>
      <h2>logout</h2>
    </>
  );
};

export default Logout;
