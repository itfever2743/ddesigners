import React from 'react';
import { NavLink } from 'react-router-dom';
const Error = () => {
  return (
    <>
      <div className="error">
        <div className="container">
          <div className="error_container">
            <div className="error404">404</div>
            <h1>Page Not Found</h1>
            <NavLink to="/">Go to Home</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
