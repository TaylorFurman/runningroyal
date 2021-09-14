import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {Link} from 'react-router-dom';


class NavBar extends (React.Component) {

    render() {
        return ( 
            <div >
               <AppBar position="relative">
                  <Toolbar>
                    <Typography style={{marginRight:'60%', marginLeft:'5%', color:'#fff'}} variant="h5" color="inherit" noWrap>
                      <Box>Run Royale</Box>
                    </Typography>
                     <Box style={{width:'20%'}}>
                      <Link style={{textDecoration:'none', fontSize:'12pt', color:'#fff'}} to="/">Home</Link>
                      <Link style={{textDecoration:'none', marginLeft:'8%', fontSize:'12pt', color:'#fff'}} to="/dashboard">Dashboard</Link>
                      <Link style={{textDecoration:'none', marginLeft:'8%', fontSize:'12pt', color:'#fff'}} to="/about">About</Link>
                     </Box>
                  </Toolbar>
              </AppBar>

            </div>
        );
    }
}

export default NavBar;