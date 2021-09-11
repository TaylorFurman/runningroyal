import React from 'react';

//import axios from "axios"

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        this.state = {runnerId:'1', place:'1', longitude: '', latitude: '', altitude: '', timestamp: '',}
    }
    
    //**pass as utility later**
    PrintCurrentPosition = async() =>{
        //this.props.getGeoLocation({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp});
            let coordinates =  await Geolocation.getCurrentPosition()
            //Displays position immediatly & stores the data as constants that are not updated later
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;
                //records epoch time in seconds
                this.state.timestamp = coordinates.timestamp - coordinates.timestamp;
                this.setState({longitude: this.state.longitude, latitude: this.state.latitude, timestamp: this.state.timestamp})

            //Updates position every 3 seconds & does not effect the original call above
            setInterval(async() => {
                let timeZero = this.state.timestamp
                let coordinates =  await Geolocation.getCurrentPosition()
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;    
                this.state.timestamp = timeZero+1 ;        
                this.setState({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp})       
        }, 1000);

    }

    handleSubmit(event){
        
        this.setState({timestamp: this.state.timestamp})
        console.log(this.state.timestamp);
        // alert("Ending run");
        // setTimeout(function() {   
        // }, 3000);
        
    }

    componentDidMount(){
        this.PrintCurrentPosition()
    }
            
    render(){
        return(
            <div>    
                 <Button onClick={(e)=>this.handleSubmit(e)} type="submit" variant='contained' color='primary' component={Link} to="/" >Stop Run</Button>
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
                            <td>{this.state.runnerId}</td>
                            <td>Average Pace</td>
                            <td>7:30</td>
                        </tr>
                        <tr>
                            <td>{this.state.place + "st place"}</td>
                            <td>Time (sec)</td>
                            <td>{this.state.timestamp}</td>
                        </tr>
                        
                </table>
                
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
        console.log(data);
    }
  }
}



var ConnectedGpsCoordinates = connect(mapStateToProps, mapDispatchToProps)(GpsCoordinates);

export default ConnectedGpsCoordinates;