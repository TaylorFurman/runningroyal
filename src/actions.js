export function getGeoLocation(data){
    return{
        type: "GET_LOCATION",
        data: data
    }
}

//normally make API here to push from front end to back end