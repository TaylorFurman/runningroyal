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
        //this.props.getGeoLocation({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp});
            let coordinates =  await Geolocation.getCurrentPosition()
            //Displays position immediatly & stores the data as constants that are not updated later
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;
                //records epoch time in seconds
                this.state.timestamp = coordinates.timestamp - coordinates.timestamp;
                this.setState({longitude: this.state.longitude, latitude: this.state.latitude, timestamp: this.state.timestamp})
                console.log(this.state.timestamp + "original")

            //Updates position every 3 seconds & does not effect the original call above
            const interval = setInterval(async() => {
                let timeZero = this.state.timestamp

                let coordinates =  await Geolocation.getCurrentPosition()
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;    
                this.state.timestamp = timeZero+1 ;        
                this.setState({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp})   
                console.log(this.state.timestamp + "new")
        }, 1000);

    }

    componentDidMount(){
        this.PrintCurrentPosition()
    }
            

    

    render(){
        return(
            <div>
                <button type="submit" onClick={(e) => this.PrintCurrentPosition(e)}>Click to get GPS Coordinates</button>
                
                    <p>Longitude:{this.state.longitude} </p>
                    <p></p>
                    <p>Latitude: {this.state.latitude}</p>
                    
                    <table className="runActiveTable1">
                        <tr>
                            <td></td>
                            <td>Distance</td>
                            <td>2.3 miles</td>
                        </tr>
                        <tr>
                            <td>Player ID</td>
                            <td>Average Pace</td>
                            <td>7:30</td>
                        </tr>
                        <tr>
                            <td>(Rank)</td>
                            <td>Time (sec)</td>
                            <td>{this.state.timestamp}</td>
                        </tr>
                        
                </table>
                
            </div>
        )
    }
}
function mapStateToProps (state) {
	return {
        
    }
}


function mapDispatchToProps (dispatch) {
	return {
        getGeoLocation: function (data) {
      dispatch(getGeoLocation(data))
      console.log(data);
    }
  }
}



var ConnectedGpsCoordinates = connect(mapStateToProps, mapDispatchToProps)(GpsCoordinates);

export default ConnectedGpsCoordinates;