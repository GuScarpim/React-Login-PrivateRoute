



// export default props =>
//     <Switch>
//         <Route exact path='/' component={Login} />
//         <Route path='/cadastrar' component={Cadastrar}/>
//         <Redirect from='*' to='/' />
//     </Switch>
import React from 'react'

import { isAuthenticated } from '../services/serverApi';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../component/login';
import Cadastrar from '../component/cadastrar';
import Logado from '../component/logado';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
      render={props =>
        isAuthenticated('@guarda-local/token') != null ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          )
      }
    />
  )
  
  const RouteLogin = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro" component={Cadastrar} />
        <PrivateRoute exact path="/" component={Logado} />
      </Switch>
    </ BrowserRouter>
  )

  export default RouteLogin;

