import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from './components/header';
import theme from './theme/theme';
import Login from './views/login';
import Dashboard from './views/dashboard';


import * as awsHelper from './utilities/aws-helper';
import { CenteredLoader } from './components/loader';

function App(props) {
  const [user, setUser] = React.useState()
  const [userData, setUserData] = React.useState()

  useEffect(() => {
    window.firebase.auth().onAuthStateChanged((usr) => {
      setUser(usr)
      if(usr === null) setUserData(null)
    })
  }, []);

  useEffect(() => {
    if (user) getUserData(window.firebase.auth().currentUser.email.split('@')[0])
  }, [user]);

  const getUserData = async (username) => {
    const user = await awsHelper.getUserData(username)
    if (user) {
      setUserData(user)
    };
  } 

  // User hasn't been retrieved from Firebase auth
  if(user === undefined && props.location.pathname !== '/login') {
    return <ThemeProvider theme={theme}>
      {CenteredLoader({height: '100%'})}
    </ThemeProvider>
  }

  // No user logged
  if(user === null && props.location.pathname !== '/login') return <Redirect to='/login' />

  // User logged
  return (
    <ThemeProvider theme={theme}>
      {/* Header Swich*/}
      <Switch>
        <Route exact path='/login' render={() => null}/>
        <Route render={(props) => (<Header user={userData} {...props} />)} />
      </Switch>
      {/* Content Swich*/}
      <Switch>
        <Route exact path='/login' render={(props) => (<Login setUserData={setUserData} {...props} />)} />
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </ThemeProvider>
  );
}

const AppWithRouter = withRouter(App)

export default AppWithRouter;

