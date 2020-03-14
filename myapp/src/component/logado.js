import React, { Component } from 'react';

import Logo from '../temp/logo';
import Footer from '../temp/footer';

import './login.css';

export default class Logado extends Component {
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
        <div className="bg-white card-white">
          <Logo className="logo-canto" />
          <div className="text-center">
            <h3>Meu token:</h3>
            <p className="token">{token}</p>
            <button className='btn btn-primary mb-2' onClick={this.handleLogout}>Sair</button>
          </div>
          <Footer />
        </div>

      );
    }
  }
}


