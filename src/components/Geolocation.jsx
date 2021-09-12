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
        this.state = {runId:'', 
        runnerId: '',
        run_date:'', 
        longitude: '', 
        latitude: '',  
        time_in_seconds: '',
        distance: '',
        finishing_rank:'',
        }
    }
    
    //**pass as utility later**
    PrintCurrentPosition = async() =>{
        //this.props.getGeoLocation({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp});
            let coordinates =  await Geolocation.getCurrentPosition()
            //Displays position immediatly & stores the data as constants that are not updated later
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;

                const long0 = this.state.longitude;
                const lat0 = this.state.latitude;

                //records epoch time in seconds
                this.state.time_in_seconds = coordinates.timestamp - coordinates.timestamp;
                this.setState({longitude: this.state.longitude, latitude: this.state.latitude, timestamp: this.state.time_in_seconds})

            //Updates position every 3 seconds & does not effect the original call above
            setInterval(async() => {
                let timeZero = this.state.time_in_seconds
                let coordinates =  await Geolocation.getCurrentPosition()
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;  
                const longNew = this.state.longitude;
                const latNew = this.state.latitude;  
                
                //haversine formula calculation for distance (also set as utility later)
                const R = 6371e3
                const φ1 = lat0 * Math.PI/180; // φ, λ in radians
                const φ2 = latNew * Math.PI/180;
                const Δφ = (latNew-lat0) * Math.PI/180;
                const Δλ = (longNew-long0) * Math.PI/180;
                
                const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                const d = R * c; //distance in metres
                this.state.distance = d;
                let d_in_km = (d/1000);

                console.log(d);
                console.log(d_in_km);

                this.state.time_in_seconds = timeZero+1 ;        
                this.setState({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.time_in_seconds, distance: this.state.distance})       
        }, 1000);
        
    }

    handleSubmit(event){
        
        fetch('http://localhost:3700/run_data', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({runnerId: this.state.runnerId,
                timestamp: this.state.time_in_seconds})
        })
        .then((res)=>{
         console.log(res.runnerId);
        // console.log('hello')
        }).catch((error)=>{
            console.log(error);
        })

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
                 <Button onClick={(e)=>this.handleSubmit(e)} type="submit" variant='contained' color='primary' component={Link} to ='/'>Stop Run</Button>
                    <p>Longitude:{this.state.longitude} </p>
                    <p></p>
                    <p>Latitude: {this.state.latitude}</p>
                    
                    <table className="runActiveTable1">
                        <tr>
                            <td>Position</td>
                            <td>Runner ID</td>
                            <td>Distance Ran</td>
                            <td>Average Pace(min/km)</td>
                            <td>Time (sec)</td>
                        </tr>
                        <tr>
                            <td>-Filler Text-</td>
                            <td>-Filler Text-</td>
                            <td>{this.state.distance}</td>
                            <td>7:30</td>
                            <td>{this.state.time_in_seconds}</td>
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