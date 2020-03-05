import React, { useEffect, useState } from 'react';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import {axiosWithAuth} from './components/AxiosAuth';

import {Login} from './components/Login';
import { Dashboard } from './components/Dashboard';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

let history = useHistory();

  let [user, setUser] = useState(null);
  let [token, setToken] = useState(false);
  let [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let user = window.localStorage.getItem('pintereachUser') ? window.localStorage.getItem('pintereachUser') : null;
    if (user !== null) setUser(user);
    axiosWithAuth().get('/validate').then(res => 
      setToken(window.localStorage.getItem('pintereachAuth')),
      setLoggedIn(true),
      ).catch(err => {
      console.log(err)
      setToken(null)
      window.localStorage.removeItem('pintereachAuth')
      setLoggedIn(false)
    });


  },[])

    const PrivateRoute = ({ component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        typeof token === "string"
        ? <Component {...props} history={history} user={user} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        : <Redirect to='/'/>
      )}/>
    )

    const PublicRoute = ({ component: Component, ...rest}) => (

      <Route {...rest} render={(props) => (
        typeof token === "string"
        ? <Redirect to='/dashboard'/>
        : <Component {...props} history={history} user={user} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      )}/>
    )

    
  return (
  <div>
      <header>
        <h1>Pintereach</h1>
      </header>

      <Switch>
      
        <PublicRoute exact path='/' component={Login}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>

      <Route></Route>
      </Switch>
      
      <footer className='footer'>
        <p className='footertext'>&copy; 2020 Pintereach</p>
     </footer>
   </div>
  );
}

export default App;
