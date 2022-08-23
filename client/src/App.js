import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import Logout from './components/Logout';
import { Routes, Route } from 'react-router-dom';
import { reducer, initialdata } from './UseReducer/UseReducer';
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialdata);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
