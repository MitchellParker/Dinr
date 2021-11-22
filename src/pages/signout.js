import React from 'react';
import {  Link } from "react-router-dom";
import './signout.css';

const SignOut = () =>{
  return (
    <body className='main'>
        <div>
            <p>You have been signed out.</p>
            <Link to="/login">
              Return to login
            </Link>
        </div>
    </body>
  );
}

export default SignOut;