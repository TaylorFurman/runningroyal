import React from 'react';

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        this.state = {id:0, longitude: '', latitude: '', altitude: '', timestamp: '',}
    }
    
    PrintCurrentPosition = async(event) =>{
        const coordinates =  await Geolocation.getCurrentPosition()
        
       // let longitude = coordinates.coords.longitude;
        //let latitude = coordinates.coords.latitude;
       // console.log(longitude);
       // console.log(latitude);
       const interval = setInterval(() => {
        this.state.longitude = coordinates.coords.longitude;
        this.state.latitude = coordinates.coords.latitude;
        console.log(this.state.latitude);
        console.log(this.state.longitude);  
    }, 3000);
        
    }
    render(){
        return(
            <div>
                <button onClick={(e) => this.PrintCurrentPosition(e)}>Click to get GPS Coordinates</button>
                <br/>
                
                <p>Longitude: </p>
                <br/>
                <p>Latitude: </p>
                <br/>
                <p>Timestamp: </p>
            </div>
        )
    }
}
function mapStateToProps (state) {
	return {};
}

function mapDispatchToProps (dispatch) {
	return {
        getGeoLocation: function (data) {
      dispatch(getGeoLocation(data))
    }
  }
}



var ConnectedGpsCoordinates = connect(mapStateToProps, mapDispatchToProps)(GpsCoordinates);

export default ConnectedGpsCoordinates;