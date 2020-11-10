import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from './components/header';
import theme from './theme/theme';
import Login from './views/login';

function App() {
  const [user, setUser] = React.useState({})

  console.log(user)
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      {/* Header Swich*/}
      <Switch>
        <Route render={(props) => (<Header {...props}/>)}/>
      </Switch>
      {/* Content Swich*/}
      <Switch>
        <Route exact path='/' render={(props) => (<Login setUser={setUser} {...props}/>)}/>
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

