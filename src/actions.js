export function getGeoLocation(data){
    return{
        type: "GET_LOCATION",
        data: data
    }
}

export function addToRunnerJoinedCount(data){
    return{
        type: "ADD_TO_COUNT",
        data: data
    }
}

export function incrementUserID(data){
    return{
        type: "ADD_USER_ID",
        data: data
    }
}

export function addRunner(data){
    return{
        type: "ADD_RUNNER",
        data: data
    }
}

//normally make API here to push from front end to back end