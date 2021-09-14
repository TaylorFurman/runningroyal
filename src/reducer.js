import deepcopy from 'deepcopy';

var initialState = {
    runnerLocation:  
        {
        longitude: '',
        latitude: '',
        timestamp: '',
        },
    runnersJoinedCount: 0,
    currentUserID: 0,
    runnersJoined:[],
};

export function runRoyalReducer (state, action) {
    if (state === undefined) {
        return initialState;
    }
    let new_state = deepcopy(state);  
    if (action.type === "GET_LOCATION"){
        console.log(action);
        new_state.runnerLocation(action.data);
        console.log(new_state + "1");
    }
    if (action.type === "ADD_TO_COUNT"){
        new_state.runnersJoinedCount++;
    }
    if (action.type === "ADD_USER_ID"){
        new_state.currentUserID++;
    }
    if (action.type === "ADD_RUNNER"){
        new_state.runnersJoined.push({ID: action.data.ID, pace: '1', distance: '1', time: '1',});
    }

    return new_state;
    
}

export default runRoyalReducer;