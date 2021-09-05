import React from 'react';

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        this.state = {runnerId:'', longitude: '', latitude: '', altitude: '', timestamp: '',}
    }
    
    PrintCurrentPosition = async(event) =>{
        console.log(event);
        //need to put "coordinates" in a loop to get new data (currently prints the same data)

            let coordinates =  await Geolocation.getCurrentPosition()
       
            //Displays position immediatly
            this.state.longitude = coordinates.coords.longitude;
                this.setState({longitude: this.state.longitude})

                this.state.latitude = coordinates.coords.latitude;
                this.setState({latitude: this.state.latitude})
                console.log("longitude" + this.state.longitude); 

                this.state.timestamp = coordinates.timestamp;
                this.setState({timestamp: this.state.timestamp})
                console.log("timestamp" + this.state.timestamp);
            
            //Updates position every 3 seconds
            const interval = setInterval(() => {
            this.state.longitude = coordinates.coords.longitude;
                this.setState({longitude: this.state.longitude})
                    console.log("latitude" + this.state.latitude);

            this.state.latitude = coordinates.coords.latitude;
                this.setState({latitude: this.state.latitude})
                 console.log("longitude" + this.state.longitude);  

            this.state.timestamp = coordinates.timestamp;
                this.setState({timestamp: this.state.timestamp})
                    console.log("timestamp" + this.state.timestamp);
             
            console.log(interval); 
        }, 3000);

    }

    render(){
        return(
            <div>
                <button type="submit" onClick={(e) => this.PrintCurrentPosition(e)}>Click to get GPS Coordinates</button>
                
                    <p>Longitude:{this.state.longitude} </p>
                    <p></p>
                    <p>Latitude: {this.state.latitude}</p>
                    <p></p>
                    <p >Timestamp: {this.state.timestamp} </p>
                    <p></p>
                
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