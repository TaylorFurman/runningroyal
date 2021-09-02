import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import { Button } from '@material-ui/core';

import ConnectedGpsCoordinates from './Geolocation.jsx'


class Home extends (React.Component) {

    render() {
        return ( 
            <div >
                Welcome Back!
                <ConnectedGpsCoordinates/>
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