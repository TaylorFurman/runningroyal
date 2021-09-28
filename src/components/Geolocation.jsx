import React from 'react';

//import axios from "axios"
import moment from 'moment'

import { Geolocation } from '@capacitor/geolocation'
import { connect } from 'react-redux'

import {getGeoLocation} from '../actions.js'

import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Table from './Table.jsx';
import { getDistance } from 'geolib';


var backEndUrl = 'https://run-royale.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
    backEndUrl ='http://localhost:3700';
}



class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        //below is in order of the database
        this.state = {
           // runId: 0, 
        runnerId: 0,
        run_date: "", 
        distance: 0,
        position: 0,
        time_in_seconds: 0,
        time_in_minutes: "",
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

            // let coordinateArray = [];
            let distanceDataArray = [];
            
            //Displays position immediatly & stores the data as constants that are not updated later
                this.state.longitude = coordinates.coords.longitude;
                this.state.latitude = coordinates.coords.latitude;
                
                let long0 = this.state.longitude;
                let lat0 = this.state.latitude;

                //records epoch time in seconds and converts to minutes
                this.state.time_in_seconds = coordinates.timestamp - coordinates.timestamp;
                this.state.time_in_minutes = (this.state.time_in_seconds/60)

                // coordinateArray.push({
                //     time_in_seconds: this.state.time_in_seconds,
                //     longitude: long0, 
                //     latitude: lat0})
                // console.log(coordinateArray);

                

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

            //setting the time for pace calculations and total running time(sec)
            this.state.time_in_seconds = timeZeroSeconds+1 ;
            this.state.time_in_minutes = Number((this.state.time_in_seconds/60).toFixed(2));
            
            // coordinateArray.push({
            //     time_in_seconds: this.state.time_in_seconds,
            //     longitude: longNew, 
            //     latitude: latNew})
            // //console.log(coordinateArray);

            let startLocation = ({latitude: lat0, longitude: long0})
            let newLocation = ({latitude: latNew, longitude: longNew})
            let distanceData = getDistance(startLocation, newLocation)

            distanceDataArray.push(distanceData);
            

            

            let totalDistance = 0;

            for (let i=0; i<distanceDataArray.length; i++){
                totalDistance += distanceDataArray[i];
                this.state.distance = totalDistance;
                this.setState({
                    distance: this.state.distance, 
                })
            }

            //calculate average pace by dividing distance by time in minutes than fixing to 2 decimal places
            let average_pace = (this.state.distance/this.state.time_in_minutes)
            this.state.average_pace = average_pace.toFixed(2);
            this.state.average_pace = Number(this.state.average_pace)


            {this.props.rooms[0].runnersJoined.map((runner) => {
            this.setState({
                runnerId: runner,
                latitude: this.state.latitude, 
                longitude: this.state.longitude, 
                time_in_seconds: this.state.time_in_seconds, 
                time_in_minutes: this.state.time_in_minutes,
                
                average_pace: this.state.average_pace}) 

            })}  
            
            

            long0 = longNew;
            lat0 = latNew;      
        }, 1000);
        
        
    }

    handleSubmit(event){
        
        fetch(`${backEndUrl}/run_data`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
               // runId: this.state.runId,
                runnerId: this.state.runnerId,
                run_date: this.state.run_date,
                distance: this.state.distance,
                position: this.state.position,
                time_in_seconds: this.state.time_in_seconds,
                time_in_minutes: this.state.time_in_minutes,
                average_pace: this.state.average_pace,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                polyline: this.state.polyline
            })
        })
        .then((res)=>{

            this.removeRunners();
            this.componentWillUnmount()


        }).catch((error)=>{
            console.log('handleSubmit of data to database error', error);
        }) 
    
    }

    removeRunners(){
        console.log('logging props', this.props);
        // let roomID = this.props.rooms[0].name;
        let roomID = 0;
        this.props.socket.emit('removeRunnersFromRun', {roomID});
        console.log('removed runners from room: '+roomID);
    }

    componentDidMount(){
        this.PrintCurrentPosition()
        console.log('mounted');
        this.props.socket.emit('get_rooms');
    }

    componentWillUnmount(){
        
        
    }
            
    render(){
        return(
            <div>   
                <div className="centerDiv"> 
                    <Button className="stopRun" onClick={(e)=>this.handleSubmit(e)} type="submit" variant='contained' color='primary' component={Link} to ='/'>Stop Run</Button>
                </div>
                <div className="centerDiv">
                    {this.props.rooms[0].runnersJoined.map((runner) => {
                        return(
                            <Table 
                                runnerID={runner}
                                runTime={this.state.time_in_minutes}
                                runDistance={this.state.distance}
                                runPace={this.state.average_pace}/>
                        );
                    })}     
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
	return {
        socket: state.socket,
        rooms: state.rooms
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