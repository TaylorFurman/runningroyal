import React from 'react';
import { connect } from 'react-redux';
import { Geolocation } from '@capacitor/geolocation';

import GpsCoordinates from './Geolocation.jsx'


class Home extends (React.Component) {

    render() {
        return ( 
            <div >
                <GpsCoordinates/>
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