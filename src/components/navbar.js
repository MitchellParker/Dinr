import React from 'react';
import {  Link } from "react-router-dom";
import './navbar.css';

const NavBar= () =>{
  return (
    <body className='navbar_container'>
        <div>
            <li className='navbar_button'>
                <Link to='/' className='navbar_link'>Home</Link>
            </li>
            <li className='navbar_button'>
                <Link to='/friends' className='navbar_link'>Friends</Link>
            </li>
            <li className='navbar_button'>
                <Link to='/login' className='navbar_link'>Log In</Link>
            </li>
            <li className='navbar_button'>
                <Link to='/signout' className='navbar_link'>Sign Out</Link>
            </li>
        </div>
    </body>
  );
}
export default NavBar;