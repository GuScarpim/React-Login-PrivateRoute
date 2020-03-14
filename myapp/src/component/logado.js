import React, { Component } from 'react';

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
        <div >
          <p>Meu token: {token}</p>
          <button onClick={this.handleLogout}>Sair</button>
        </div>
      );
    }
  }
}


