import { isAuthenticated } from '../services/login.service';

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