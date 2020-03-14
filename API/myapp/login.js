import React, { Component } from 'react';
import './login.css';

import Axios from 'axios';

import { Link } from 'react-router-dom';

const urlLogin = 'http://localhost:3007/api/login/'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      email: '',
      password: '',
      auth: true
    }
  }

  logar = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const obj = {
      email: email.toLowerCase(),
      password: password
    }

    Axios.post(urlLogin, obj)
      .then((response) => {
        this.setState({ item: response.data })
        localStorage.setItem('@guarda-local/token', this.state.item.token);
        this.props.history.push('/');
        console.log(this.state.item.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogout = () => {
    localStorage.removeItem('@guarda-local/token');
    window.location.reload();
  }

  render() {
    const token = localStorage.getItem('@guarda-local/token');
    if (token !== null) {
      return (
        <div >
          <p>Meu token: {token}</p>
          <button onClick={this.handleLogout}>Sair</button>
        </div>
      );
    }

    return (
      <div className="bg-primary">
     
      </div>
    );
  }
}
