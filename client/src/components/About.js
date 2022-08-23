import React, { useEffect, useState } from 'react';
import Images from './ProjectImages';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { state, dispatch } = useContext(UserContext);

  const { _id, name, email, phone, work } = userData;

  const AboutAuth = async () => {
    const res = await fetch('/aboutus', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    setUserData(data);
    dispatch({ type: 'USER', payload: true });
    if (data.status === 400) {
      navigate('/login');
    }
  };

  useEffect(() => {
    AboutAuth();
  }, []);
  return (
    <>
      <div className="about">
        <div className="container">
          <div className="about_container">
            <div className="about_left">
              <div className="about_img">
                <img src={Images[1].img} alt="About Img" />
              </div>
              <div className="about_work">
                <h5 className="work">{work}</h5>
              </div>
            </div>
            <div className="about_right">
              <div className="user_detail">
                <h2>{name}</h2>
              </div>
              <hr />
              <div className="other_details">
                <p className="id">
                  <span>ID:</span>
                  {_id}
                </p>
                <p className="id">
                  <span>Name:</span>
                  {name}
                </p>
                <p className="email">
                  <span>Email: </span>
                  {email}
                </p>
                <p className="email">
                  <span>Phone: </span>
                  {phone}
                </p>
                <p className="email">
                  <span>Work: </span>
                  {work}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
