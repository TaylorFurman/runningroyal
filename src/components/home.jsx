import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import { Button } from '@material-ui/core';




class Home extends (React.Component) {

    render() {
        return ( 
            <div>
                <h1>Welcome Back!</h1>
                
                <Button component={Link} to="/run-lobby" >Run Royal!</Button>
            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {}; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;