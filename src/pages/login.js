import React from 'react';
import './login.css';

const LogIn = () =>{
  return (
    <body className='main'>
      <div>
        <h1> Welcome to Dinr! </h1>
        <br/>
        <form id="loginForm">
            <label for="username">
                Username:
            </label>
            <input type="text" name="username" id="username" required />
            <br/>
            <label for="password">
                Password:
            </label>
            <input type="password" name="password" id="password" required />
            <br/>
            <input type="submit" value="Login" />
        </form>
      </div>
    </body>
  );
}

export default LogIn;