import React, { useState, useEffect } from 'react';
import Images from './ProjectImages';
import { UserContext } from '../App';

const Contact = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [message, setMessage] = useState('');
  // ########### Getting Data #############
  const ContactData = async () => {
    const res = await fetch('/getdata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    setUserData({
      ...userData,
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    if (data.status === 400) {
      console.log('');
    } else {
      dispatch({ type: 'USER', payload: true });
    }
  };
  let name, value;
  const userInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    ContactData();
  }, []);

  // ############### Sending Message ############
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, message } = userData;
      if (
        name === '' ||
        email === '' ||
        phone === '' ||
        message === ''
      ) {
        setMessage('Please Fill All Fields');
      } else {
        const res = await fetch('/contactus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, phone, message }),
          credentials: 'include',
        });

        const data = await res.json();
        if (data.status === 400) {
          setMessage('Message Not Sent');
        } else {
          setUserData({ ...userData, message: '' });
          setMessage('Message Sent');
        }
      }
    } catch (err) {
      setMessage(err);
    }
  };
  return (
    <>
      <div className="contact">
        <div className="message">{message}</div>
        <div className="container">
          <form method="POST">
            <div className="contact_container">
              <div className="contact_left">
                <h2>Contact</h2>
                <div className="input_group">
                  <input
                    type="text"
                    name="name"
                    onChange={userInputs}
                    value={userData.name}
                    placeholder="Name"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="email"
                    name="email"
                    onChange={userInputs}
                    value={userData.email}
                    placeholder="Email"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="text"
                    name="phone"
                    onChange={userInputs}
                    value={userData.phone}
                    placeholder="Phone"
                  />
                </div>
                <div className="input_group">
                  <textarea
                    name="message"
                    id="message"
                    onChange={userInputs}
                    value={userData.message}
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="input_group">
                  <input
                    type="submit"
                    value="Contact Now"
                    onClick={sendMessage}
                    id="submit"
                  />
                </div>
              </div>
              <div className="line"></div>
              <div className="contact_right">
                <div className="contact_img">
                  <img src={Images[4].img} alt="Contact Img" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
