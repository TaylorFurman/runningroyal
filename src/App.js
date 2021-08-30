import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store.js';
import ConnectedGroupRunLobby from './components/group-run-lobby';
import ConnectedGroupRunReadyUp from './components/group-run-ready-up.jsx';
import ConnectedGroupRunActive from './components/group-run-active.jsx';
import ConnectedHome from './components/home';
import ConnectedDashboard from './components/dashboard';


const theme = createTheme({
  palette: {
    primary: {
      main: '#115293',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
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
            <AppBar position="relative">
                <Toolbar>
                  <Typography style={{marginRight:'60%', marginLeft:'5%', color:'#fff'}} variant="h5" color="inherit" noWrap>
                    <Box>Running Royal</Box>
                  </Typography>
                   <Box style={{width:'20%'}}>
                    <Link style={{textDecoration:'none', fontSize:'12pt', color:'#fff'}} to="/">Home</Link>
                    <Link style={{textDecoration:'none', marginLeft:'8%', fontSize:'12pt', color:'#fff'}} to="/dashboard">Dashboard</Link>
                   </Box>
                </Toolbar>
            </AppBar>
            <div>

            </div>
            <Switch>
              <Route exact path="/" component={ConnectedHome}/>
              <Route exact path="/dashboard" component={ConnectedDashboard}/>
              <Route exact path="/run-ready" component={ConnectedGroupRunReadyUp}/>
              <Route exact path="/run-lobby" component={ConnectedGroupRunLobby}/>
              <Route exact path="/run-active" component={ConnectedGroupRunActive}/>
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>  
  );
}

export default App;
