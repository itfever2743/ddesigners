import React, { useEffect, useState, useContext } from 'react';
import Images from './ProjectImages';
import { UserContext } from '../App';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [check, setCheck] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const HeaderData = async () => {
    const res = await fetch('/getdata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    if (data.status === 400) {
      console.log('');
    } else {
      setUserName(data.name);
      setCheck(true);
      dispatch({ type: 'USER', payload: true });
    }
  };

  useEffect(() => {
    HeaderData();
  }, []);
  return (
    <>
      <header className="header">
        <div className="header_left">
          <h5>Welcome</h5>
          <h1>{userName}</h1>
          <h2>
            {check
              ? 'We are the MERN Developers'
              : 'Happy, to see you Back'}
          </h2>
        </div>
        <div className="header_right">
          <div className="img">
            <img src={Images[0].img} alt="Header_view" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
