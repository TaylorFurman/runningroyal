export function getGeoLocation(data){
    return{
        type: "GET_LOCATION",
        data: data
    }
}

export function addToRunnerJoinedCount(data){
    return{
        type: "Add_TO_COUNT",
        data: data
    }
}

//normally make API here to push from front end to back end