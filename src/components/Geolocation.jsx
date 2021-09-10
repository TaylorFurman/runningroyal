import React from 'react';

import axios from "axios"

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        this.state = {runnerId:'', longitude: '', latitude: '', altitude: '', timestamp: '',}
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

    componentDidMount(){
        this.PrintCurrentPosition()
    }
    
    componentWillUnmount(){
        axios.get('./runningroyal/src/data/run_history.json')
        .then(res => {
            res = res.json();
            console.log(res);
            console.log(res.data);
        })       
    }
            
    render(){
        return(
            <div>    
                 <Button variant='contained' color='primary' component={Link} to="/" >Stop Run</Button>
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
                            <td>Player ID 1</td>
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