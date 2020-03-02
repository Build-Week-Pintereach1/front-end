import React, { useEffect, useState } from 'react';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';

import {Login} from './components/Login';
import {dashboard, Dashboard} from './components/Dashboard'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

let history = useHistory();


  let [user, setUser] = useState();
  let [token, setToken] = useState();
  let [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let user = window.localStorage.getItem('pintereachUser') ? window.localStorage.getItem('pintereachUser') : null;
    let token = window.localStorage.getItem('pintereachAuth') ? window.localStorage.getItem('pintereachAuth') : null;
    setUser(user);
    setToken(token);
    let x = () => window.localStorage.getItem('pintereachAuth') ? setLoggedIn(true) : null;
    x();
  },[])

    const PrivateRoute = ({ component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        token !== null
        ? <Component {...props} history={history} user={user} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        : <Redirect to='/'/>
      )}/>
    )

    const PublicRoute = ({ component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        token !== null
        ? <Redirect to='/dashboard'/>
        : <Component {...props} history={history} user={user} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      )}/>
    )

    
  return (
    <div>
       {token}
    <Switch>
     
      <PublicRoute exact path='/' component={Login}/>
      <PrivateRoute path='/dashboard' component={Dashboard}/>

    <Route></Route>
    </Switch>
</div>
  );
}

export default App;
