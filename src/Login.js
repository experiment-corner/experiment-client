import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      responseToPost: "",
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:1234/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
       }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.type]: event.target.value,
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <span>Login page</span>
          <label>Username</label>
          <input type="email" onChange={this.handleChange} placeholder="Enter email" value={this.state.email} className="inputType" required></input>
          <label>Password</label>
          <input type="password" onChange={this.handleChange} placeholder="Enter password" value={this.state.password} className="inputType" required></input>
          <button disabled={!this.validateForm()} type="submit" className="buttonType">Login</button>
          <p>{this.state.responseToPost}</p>
        </form>
      </div>
    );
  }
}

export default Login;
