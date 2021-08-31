import React from 'react';

import Geolocation from '@capacitor/geolocation'


class Geolocation extends (React.Component){
    constructor(props){
        super (props);
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}

const PrintCurrentPosition = async() =>{
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current Position: ', coordinates)
}

PrintCurrentPosition();