import React from 'react';
import {  Link } from "react-router-dom";
import './navbar.css';

const NavBar= () =>{
  return (
    <body className='container'>
        <div>
            <li className='button'>
                <Link to='/' className='link'>Home</Link>
            </li>
            <li className='button'>
                <Link to='/friends' className='link'>Friends</Link>
            </li>
            <li className='button'>
                <Link to='/login' className='link'>Log In</Link>
            </li>
            <li className='button'>
                <Link to='/signout' className='link'>Sign Out</Link>
            </li>
        </div>
    </body>
  );
}
export default NavBar;