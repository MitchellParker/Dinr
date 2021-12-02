import React from 'react';
import './login.css';
import useAuth from '../useAuth';
import { Navigate } from 'react-router';

// The form that gets username and password
// creates account or logs in as necessary
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      message: "",
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  // what to do when user edits text in username box
  updateUsername(event) {
    this.setState({ username: event.target.value });
  }
  // what to do when user edits text in password box
  updatePassword(event) {
    this.setState({ password: event.target.value });
  }
  // what to do when user clicks login button
  handleLogin(event) {
    this.props.onLogin(this.state.username, this.state.password).then(res => {
      if (!res.authed) {
        this.setState({
          message: res.message
        })
      }
    });
  }
  // what to do when user clicks create account button
  async handleRegister(event) {
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        message: "Enter a username and password to create your account"
      })
      return
    }
    // Send info to backend /register route
    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: this.state.username,   
        password: this.state.password
      })
    }).then(res => res.json());
    this.setState({
      message: res.message
    })
  }

  render() {
    return (
      <div className="login_form">
        <label className = "login_username">
          Username:
          <input className = "login_inputbox"
            type="text"
            value={this.state.username}
            onChange={this.updateUsername}
          />
        </label>
        <br />
        <label>
          Password:
          <input className = "login_inputbox"
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
        </label>
        <br/>
        <div className = "login_buttons">
        <input type="submit" value="Login" onClick={this.handleLogin} />
        <input type="submit" value="Create Account" onClick={this.handleRegister} />
        </div>
        <br />
        <div>
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

// Control which page is displayed
// If there is no user logged in, redirect to login screen
const Login = () => {
  const { authed, login } = useAuth();
  return authed ? (
    <Navigate to="/" />
  ) : (
    <body className="login">
      <h1> Welcome to Dinr! </h1>
      <br />
      <LoginForm onLogin={login} />
    </body>
  );
};

export default Login;