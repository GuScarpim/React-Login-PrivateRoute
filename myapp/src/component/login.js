import React, { Component } from 'react';
import './login.css';

import Axios from 'axios';

import Logo from '../temp/logo';

import { Link } from 'react-router-dom';

const urlLogin = 'http://localhost:3007/api/v1/login/'

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

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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
        console.log(this.state.item);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">

                <div className="row">
                  <div className="col-lg-4 d-none d-lg-block ml-2 container-logo">
                    <Logo className="scarpim-logo" />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Seja bem-vindo!</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" id="email"
                            placeholder="Enter Email Address..." value={this.state.email} onChange={this.onChange} required />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user" id="password"
                            placeholder="Password" value={this.state.password} onChange={this.onChange} required />
                        </div>
                        <Link to="/logado" className="btn btn-primary btn-user btn-block" onClick={this.logar}>
                          Login
                           </Link>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link to="/cadastro" className="small">Create an Account!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}