import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Images from './ProjectImages';
import { UserContext } from '../App';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  let name, value;
  const userValue = (e) => {
    name = e.target.name;
    value = e.target.value;
    setLogin({ ...login, [name]: value });
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = login;
      if (email === '' || password === '') {
        setMessage('Please Fill All Fields');
      } else {
        const res = await fetch('/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: 'include',
        });
        const data = await res.json();
        if (data.status === 400) {
          setMessage(data.message);
        } else {
          setMessage(data.message);
          dispatch({ type: 'USER', payload: true });
          navigate('/');
        }
      }
    } catch (err) {
      setMessage(err);
    }
  };
  return (
    <>
      <div className="login">
        <div className="message">{message}</div>
        <div className="container">
          <div className="login_container">
            <div className="login_left">
              <form method="post">
                <h2>Login</h2>
                <div className="input_group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={login.name}
                    onChange={userValue}
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={login.password}
                    onChange={userValue}
                  />
                </div>
                <div className="input_group">
                  <input
                    type="submit"
                    value="Login"
                    onClick={userLogin}
                    id="submit"
                  />
                </div>
              </form>
              <div className="forget">
                <span>Forget Your Password </span>
                <NavLink to="/">Click Here</NavLink>
              </div>
              <div className="forget">
                <span>Don't have a account </span>
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </div>
            <div className="line"></div>
            <div className="login_right">
              <div className="login_img">
                <img src={Images[2].img} alt="login img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
