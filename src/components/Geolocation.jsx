import React from 'react';

import { Geolocation } from '@capacitor/geolocation'

// const PrintCurrentPosition = async(event) =>{
//     const coordinates = await Geolocation.getCurrentPosition();
//     console.log(coordinates);
//     console.log(coordinates.coords);
//     console.log(coordinates.timestamp);
//     //console.log('Current longitude: ', coordinates.coords.longitude)
//     let longitude =() => {this.setState({longitude: coordinates.coords.longitude})}
//     console.log(longitude);
//     //console.log('Current latitude: ', coordinates.coords.latitude)
// }

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
        this.state = 
                {
                longitude: '',
                latitude: '',
                altitude: '',
                timestamp: '',
                }
    }
    
    PrintCurrentPosition = async(event) =>{
        const coordinates =  await Geolocation.getCurrentPosition();
       // let longitude = coordinates.coords.longitude;
        //let latitude = coordinates.coords.latitude;
       // console.log(longitude);
       // console.log(latitude);
        this.state.longitude = coordinates.coords.longitude;
        console.log(this.state.longitude );
        this.state.latitude = coordinates.coords.latitude;
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



export default GpsCoordinates