import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const RenderNavbar = () => {
  const { state, dispatch } = useContext(UserContext);
  if (state) {
    return (
      <>
        <li className="nav_item">
          <NavLink to="/" className="nav_link">
            Home
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/about" className="nav_link">
            About
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/contact" className="nav_link">
            Contact
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/logout" className="nav_link">
            Logout
          </NavLink>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li className="nav_item">
          <NavLink to="/" className="nav_link">
            Home
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/about" className="nav_link">
            About
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/contact" className="nav_link">
            Contact
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/login" className="nav_link">
            Login
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/signup" className="nav_link">
            Sign Up
          </NavLink>
        </li>
      </>
    );
  }
};
const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="nav_container">
            <h2 className="logo">
              <NavLink to="/">Neo Developers</NavLink>
            </h2>
            <input type="checkbox" id="check" />
            <div className="hamburger">
              <div className="lines">
                <div className="lined line1"></div>
                <div className="lined line2"></div>
                <div className="lined line3"></div>
              </div>
            </div>
            <ul className="navbar_nav">
              <RenderNavbar />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
