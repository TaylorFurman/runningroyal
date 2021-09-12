import React from 'react';

//import axios from "axios"
import moment from 'moment'

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        this.state = {
            runId:'', 
        runnerId: '',
        run_date:'', 
        longitude: '', 
        latitude: '',  
        time_in_seconds: '',
        time_in_minutes: '',
        distance: '',
        finishing_rank:'',
        average_pace:''
        }
    }
    
    //**pass as utility later**
    PrintCurrentPosition = async() =>{
        //this.props.getGeoLocation({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp});
            let coordinates =  await Geolocation.getCurrentPosition()
            //Displays position immediatly & stores the data as constants that are not updated later
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;
                console.log(coordinates);

                const long0 = this.state.longitude;
                const lat0 = this.state.latitude;

                //records epoch time in seconds and converts to minutes
                this.state.time_in_seconds = coordinates.timestamp - coordinates.timestamp;
                this.state.time_in_minutes = (this.state.time_in_seconds/60)

                //fetches current date based on epoch time
                
                let sqlDate = moment(coordinates.timestamp).format("YYYY-MM-DD")
                console.log(sqlDate);
                this.state.run_date = sqlDate
                
                
                this.setState({longitude: this.state.longitude, latitude: this.state.latitude, timestamp: this.state.time_in_seconds, run_date: this.state.run_date})

            //Updates position every 3 seconds & does not effect the original call above
            setInterval(async() => {
                let timeZeroSeconds = this.state.time_in_seconds
                let timeZeroMinutes = this.state.time_in_minutes
                let coordinates =  await Geolocation.getCurrentPosition()
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;  
                let longNew = this.state.longitude++;
                const latNew = this.state.latitude;  
                
                //haversine formula calculation for distance (also set as utility later)
                const R = 6371e3
                const φ1 = lat0 * Math.PI/180; // φ, λ in radians
                const φ2 = latNew * Math.PI/180;
                const Δφ = (latNew-lat0) * Math.PI/180;
                const Δλ = (longNew-long0) * Math.PI/180;
                
                const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                const distance = (0.001*(R * c)); //distance in kilometres
                this.state.distance = distance.toFixed(2);
                
                this.state.time_in_seconds = timeZeroSeconds+1 ;
                this.state.time_in_minutes = this.state.time_in_seconds/60;
                console.log(this.state.time_in_minutes)
                let runningTime = this.state.time_in_seconds; 
                
                //calculate average pace by dividing distance by time in minutes than fixing to 2 decimal places
                let average_pace = (this.state.distance/this.state.time_in_minutes)

                this.state.average_pace = average_pace.toFixed(2);
                //console.log(this.state.average_pace)

                this.setState({latitude: this.state.latitude, 
                    longitude: this.state.longitude, 
                    timestamp: this.state.time_in_seconds, 
                    distance: this.state.distance, 
                    average_pace: this.state.average_pace})       
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
                        <tbody>
                            
                        <tr>
                            <td>Position</td>
                            <td>Runner ID</td>
                            <td>Distance Ran</td>
                            <td>Time (sec)</td>
                            <td>Average Pace(km/min)</td>
                            
                        </tr>
                        <tr>
                            <td>-Filler Text-</td>
                            <td>-Filler Text-</td>
                            <td>{this.state.distance}</td>
                            <td>{this.state.time_in_seconds}</td>
                            <td>{this.state.average_pace}</td>
                            
                        </tr>
                        
                        </tbody>
                        
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