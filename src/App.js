import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from './components/header';
import theme from './theme/theme';
import Login from './views/login';
import Dashboard from './views/dashboard';

function App() {
  const [user, setUser] = React.useState()
  const [userData, setUserData] = React.useState()

  useEffect(() => {
    window.firebase.auth().onAuthStateChanged(userUpdate);
  });

  const userUpdate = (user) => {
    setUser(user)
    if (!user) setUserData(null)
  }


  return (
    <ThemeProvider theme={theme}>
      {/* Header Swich*/}
      {!user && <Redirect to='/login' />}
      <Switch>
        <Route render={(props) => (<Header user={userData} {...props} />)} />
      </Switch>
      {/* Content Swich*/}
      <Switch>
        <Route exact path='/login' render={(props) => (<Login setUserData={setUserData} {...props} />)} />
        <Route path={'/dashboard'} component={Dashboard}/>
      </Switch>
    </ThemeProvider>
  );
}

export default App;

