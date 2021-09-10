import deepcopy from 'deepcopy';

var initialState = {
    runnerLocation:  
        {id: 0,
        longitude: '',
        latitude: '',
        altitude: '',
        timestamp: '',
        },
    runnersJoinedCount: 0,
};

export function runRoyalReducer (state, action) {
    if (state === undefined) {
        return initialState;
    }
    let new_state = deepcopy(state);  

    if (action.type === "GET_LOCATION"){
        new_state.runnerLocation.push(action.data);
    }
    if (action.type === "Add_TO_COUNT"){
        new_state.runnersJoinedCount++;
    }

    return new_state;
}

export default runRoyalReducer;