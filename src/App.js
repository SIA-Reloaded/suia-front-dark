import React, { useContext } from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

import Header from './components/header';

import Login from './views/login';
import Dashboard from './views/dashboard';
import { UserContext } from './providers/user-provider'
import { CenteredLoader } from './components/loader';

function App(props) {
  const user = useContext(UserContext)
  console.log(user)

// User hasn't been retrieved from Firebase auth
if (user === undefined && props.location.pathname !== '/login') {
  return CenteredLoader({ height: '100%' })
}

// No user logged
if (user === null && props.location.pathname !== '/login') return <Redirect to='/login' />

// User logged, redirecting from login to dashboard
if (user && props.location.pathname === '/login') return <Redirect to='/dashboard' />

// User logged
return (
  <React.Fragment>
    {/* Header Swich*/}
    <Switch>
      <Route exact path='/login' render={() => null} />
      <Route component={Header}/>
    </Switch>
    {/* Content Swich*/}
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route path='/' component={Dashboard} />
    </Switch>
  </React.Fragment>
);
}

const AppWithRouter = withRouter(App)

export default AppWithRouter;

