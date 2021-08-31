import React from 'react';

import { Geolocation } from '@capacitor/geolocation'

const PrintCurrentPosition = async(event) =>{
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current longitude: ', coordinates.coords.longitude)
    console.log('Current latitude: ', coordinates.coords.latitude)
}

class GpsCoordinates extends (React.Component){
    constructor(props){
        super (props);
    }
    render(){
        return(
            <div>
                <button onClick={(e) => PrintCurrentPosition(e)}>Click to get GPS Coordinates</button>
            </div>
        )
    }
}



export default GpsCoordinates