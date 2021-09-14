import React from 'react';

//import axios from "axios"
import moment from 'moment'

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Table from './Table.jsx';

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        //below is in order of the database
        this.state = {
            runId:0, 
        runnerId: 0,
        run_date: "", 
        distance: 0,
        position: 0,
        time_in_seconds: 0,
        time_in_minutes: 0,
        average_pace: 0,
        latitude: 0, 
        longitude: 0,
        polyline: 0,  
        }
    }

    
    //**pass as utility later**
    PrintCurrentPosition = async() =>{
        //this.props.getGeoLocation({latitude: this.state.latitude, longitude: this.state.longitude, timestamp: this.state.timestamp});
            let coordinates =  await Geolocation.getCurrentPosition()

            let coordinateArray = [];
            //Displays position immediatly & stores the data as constants that are not updated later
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;
                
                let long0 = this.state.longitude;
                let lat0 = this.state.latitude;

                //records epoch time in seconds and converts to minutes
                this.state.time_in_seconds = coordinates.timestamp - coordinates.timestamp;
                this.state.time_in_minutes = (this.state.time_in_seconds/60)

                //fetches current date based on epoch time
                
                let sqlDate = moment(coordinates.timestamp).format("YYYY-MM-DD")
                this.state.run_date = sqlDate
    
                //sets the state
                this.setState({
                    longitude: this.state.longitude, 
                    latitude: this.state.latitude, 
                    timestamp: this.state.time_in_seconds, 
                    run_date: this.state.run_date
                })

            //Updates position every 3 seconds & does not effect the original call above
            setInterval(async() => {
                let timeZeroSeconds = this.state.time_in_seconds
                let coordinates =  await Geolocation.getCurrentPosition()
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;  
                let longNew = this.state.longitude;
                let latNew = this.state.latitude;  
                
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
                this.state.distance = Number(this.state.distance);

                //setting the time for pace calculations and total running time(sec)
                this.state.time_in_seconds = timeZeroSeconds+1 ;
                this.state.time_in_minutes = Number(this.state.time_in_seconds/60);
                
                //calculate average pace by dividing distance by time in minutes than fixing to 2 decimal places
                let average_pace = (this.state.distance/this.state.time_in_minutes)
                this.state.average_pace = average_pace.toFixed(2);
                this.state.average_pace = Number(this.state.average_pace)

                this.setState({
                    latitude: this.state.latitude, 
                    longitude: this.state.longitude, 
                    time_in_seconds: this.state.time_in_seconds, 
                    time_in_minutes: this.state.time_in_minutes,
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
            body: JSON.stringify({
                runId: this.state.runId,
                runnerId: this.state.runnerId,
                run_date: this.state.run_date,
                distance: this.state.distance,
                time_in_seconds: this.state.time_in_seconds,
                time_in_minutes: this.state.time_in_minutes,
                average_pace: this.state.average_pace,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                polyline: this.state.polyline
            })
        })
        .then((res)=>{
         console.log();

        }).catch((error)=>{
            console.log(error);
        })  
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

                    {this.props.runnersJoined.map(runner => {
                        return(
                            <Table 
                                runnerID={runner.ID} 
                                runTime={runner.time} 
                                runDistance={runner.distance}
                                runPace={runner.pace}/>
                        );
                    })}
                    
                    {/* <table className="runActiveTable1">
                        <tbody>
                            
                        <tr>
                            <td>Position</td>
                            <td>Runner ID</td>
                            <td>Distance Ran</td>
                            <td>Time (sec)</td>
                            <td>Average Pace(km/min)</td>
                            
                        </tr>
                        <tr>
                            <td>{this.state.position}</td>
                            <td>{this.state.runnerId}</td>
                            <td>{this.state.distance}</td>
                            <td>{this.state.time_in_seconds}</td>
                            <td>{this.state.average_pace}</td>
                            
                        </tr>
                        
                        </tbody>
                        
                </table> */}
                
            </div>
        )
    }
}

function mapStateToProps (state) {
	return {
        runnersJoinedCount: state.runnersJoinedCount,
        runnersJoined: state.runnersJoined,
    };
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