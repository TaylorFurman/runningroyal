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
        console.log(event);
        //need to put "coordinates" in a loop to get new data (currently prints the same data)
        const coordinates =  await Geolocation.getCurrentPosition()
        const interval = setInterval(() => {
        this.state.longitude = coordinates.coords.longitude;
        this.state.latitude = coordinates.coords.latitude;
        this.state.timestamp = coordinates.timestamp;
        console.log(this.state.latitude);
        console.log(this.state.longitude);  
        console.log(this.state.timestamp); 
    }, 3000);
    }
   updateLongitude(event){
       this.setState({longitude: this.state.longitude})
   }

    render(){
        return(
            <div>
                <button type="submit" onClick={(e) => this.PrintCurrentPosition(e)}>Click to get GPS Coordinates</button>
                <ul>
                    <li><p>Longitude: </p></li>
                    <li><p></p></li>
                    <li><p>Latitude: {this.state.latitdue}</p></li>
                    <li><p></p></li>
                    <li><p >Timestamp: </p></li>
                    <li><p></p></li>
                </ul>
                
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