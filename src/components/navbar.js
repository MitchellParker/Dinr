import React from 'react';
import {  Link } from "react-router-dom";
import './navbar.css';
import useAuth from '../useAuth';

const NavBar= () =>{
  const { authed, user, logout } = useAuth();
  return (
    <body className="navbar_container">
      <div>
        {authed ? (
          <li className="navbar_button">
            User: {user} <br />
            <Link onClick={logout} to="/signout" className="navbar_link">
              Sign Out
            </Link>
          </li>
        ) : (
          <li className="navbar_button">
            <Link to="/login" className="navbar_link">
              Log In
            </Link>
          </li>
        )}
        {authed ? (
          <div>
            <li className="navbar_button">
              <Link to="/" className="navbar_link">
                Home
              </Link>
            </li>
            <li className="navbar_button">
              <Link to="/friends" className="navbar_link">
                Friends
              </Link>
            </li>
          </div>
        ) : (
          <div />
        )}
      </div>
    </body>
  );
}
export default NavBar;