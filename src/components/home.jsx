import React from 'react';
import { connect } from 'react-redux';
import { Geolocation } from '@capacitor/geolocation';

const PrintCurrentPosition = async() =>{
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current latitude: ', coordinates.coords.latitude)
    console.log('Current longitude: ', coordinates.coords.longitude)
}



class Home extends (React.Component) {

    render() {
        return ( 
            <div >
                <PrintCurrentPosition/>
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