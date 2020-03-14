import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const urlCadastro = 'http://localhost:3007/api/v1/usuarios';

export default class Cadastrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      lastname: '',
      password: '',
      password2: '',
      email: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  criarConta = e => {
    e.preventDefault();
    const { email, password, username, lastname, password2 } = this.state;
    const obj = {
      username: username.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      password: password
    }
    if (password == password2) {
      return axios.post(urlCadastro, obj)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    } 
  }

  render() {
    return (
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" id="username" placeholder="First Name"
                          value={this.state.username} onChange={this.onChange} required />
                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" id="lastname" placeholder="Last Name"
                          value={this.state.lastname} onChange={this.onChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" id="email" placeholder="Email Address"
                        value={this.state.email} onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="password" className="form-control form-control-user" id="password" placeholder="Password"
                          value={this.state.password} onChange={this.onChange} required />
                      </div>
                      <div className="col-sm-6">
                        <input type="password" className="form-control form-control-user" id="password2" placeholder="Repeat Password"
                          value={this.state.password2} onChange={this.onChange} required />
                      </div>
                    </div>
                    <button onClick={this.criarConta} className="btn btn-primary btn-user btn-block">
                      Criar conta </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to={'/login'} >Already have an account? Login!</Link>
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