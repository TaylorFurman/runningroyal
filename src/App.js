import './App.css';
import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';


import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store.js';
import NavBar from './components/NavBar.jsx'
import ConnectedGroupRunLobby from './components/group-run-lobby';
import ConnectedGroupRunReadyUp from './components/group-run-ready-up.jsx';
import ConnectedGroupRunActive from './components/group-run-active.jsx';
import ConnectedHome from './components/home';
import ConnectedDashboard from './components/dashboard';
import About from './components/about';
import ConnectedLogin from './components/ConnectedLogin'



const theme = createTheme({
  palette: {
    primary: {
      main: '#115293',
    },
    secondary: {
      main: '#D3D3D3',
    },
    error: {
      main: '#EA1010',
    },
    background: {
      default: '#fff',
    },
 
  },  

});

// const NoMatch = ({ location }) => {
//   <div>
//     <h3>Page not found: {location.pathname}</h3>
//   </div>
// }

function App() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <BrowserRouter>
              
              <div>
                <NavBar/>
              </div>
              <Switch>
                <Route exact path="/" component={ConnectedHome}></Route>
                <Route exact path="/login" component={ConnectedLogin}></Route>
                <Route exact path="/dashboard" component={ConnectedDashboard}></Route>
                <Route path="/run-ready/:room" component={ConnectedGroupRunReadyUp}></Route>
                <Route exact path="/run-lobby" component={ConnectedGroupRunLobby}></Route>
                <Route exact path="/run-active" component={ConnectedGroupRunActive}></Route>
                <Route exact path="/about" component={About}></Route>
              </Switch>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </Provider>  
    );
  }
  


export default App;
