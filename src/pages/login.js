import React from 'react';
import './login.css';
import useAuth from '../useAuth';
import { Navigate } from 'react-router';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
  }

  register(event) {
    console.log("data sent")
    fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: this.state.username,   
        password: this.state.password,
        breakfast: "",
        lunch: "",
        dinner: "",
        breakfastTime: "",
        lunchTime: "",
        dinnerTime: "",
        friendlist: []
      })
    });
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }
  updatePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    this.register();
    this.props.onSubmit(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="login_form">
        <label>
          Username:
          <input
            type="text"
            value={this.state.username}
            onChange={this.updateUsername}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
        </label>
        <br />
        <input type="submit" value="Login" onClick={this.handleSubmit} />
      </div>
    );
  }
}

const Login = () => {
  const { authed, login } = useAuth();
  return authed ? (
    <Navigate to="/" />
  ) : (
    <body className="login">
      <h1> Welcome to Dinr! </h1>
      <br />
      <LoginForm onSubmit={login} />
    </body>
  );
};

export default Login;