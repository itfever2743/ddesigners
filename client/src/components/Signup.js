import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Images from './ProjectImages';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
  });
  const [message, setMessage] = useState('');

  let name, value;
  const inputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  // ######## Fields #############
  // const userName = document.getElementById('name');
  // const userEmail = document.getElementById('email');
  // const userPhone = document.getElementById('phone');
  // const userWork = document.getElementById('work');
  // const userPassword = document.getElementById('password');
  // const confirmPassword = document.getElementById('cpassword');

  const postData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, work, password, cpassword } = user;
      if (
        name === '' ||
        email === '' ||
        phone === '' ||
        work === '' ||
        password === '' ||
        cpassword === ''
      ) {
        setMessage('Please Fill All Fields');
      } else if (password !== cpassword) {
        setMessage('Password are not Matching');
      } else {
        const res = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            work,
            password,
            cpassword,
          }),
          credentials: 'include',
        });
        const data = await res.json();
        if (
          data.status === 422 ||
          data.status === 403 ||
          data.status === 400
        ) {
          setMessage(data.message);
        } else {
          navigate('/login');
        }
      }
    } catch (err) {
      setMessage(err);
    }
  };
  return (
    <>
      <div className="signup">
        <div className="message">{message}</div>
        <div className="container">
          <div className="signup_container">
            <div className="signup_left">
              <div className="signup_img">
                <img src={Images[3].img} alt="Signup img" />
              </div>
            </div>
            <div className="line"></div>
            <div className="signup_right">
              <h2>Sign Up</h2>
              <form method="POST">
                <div className="input_group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={inputs}
                    value={user.name}
                    id="userName"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={inputs}
                    value={user.email}
                    id="userEmail"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={inputs}
                    value={user.phone}
                    id="userPhone"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="text"
                    name="work"
                    placeholder="Work"
                    onChange={inputs}
                    value={user.work}
                    id="userWork"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputs}
                    value={user.password}
                    id="userPass"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={inputs}
                    value={user.cpassword}
                    id="userCpass"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="submit"
                    value="Sign Up"
                    onClick={postData}
                    id="submit"
                  />
                </div>
              </form>
              <div className="forget">
                <span>Already have an Account </span>
                <NavLink to="/login">Sign in</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
