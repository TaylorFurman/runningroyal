import deepcopy from 'deepcopy';

var initialState = {
    runnerLocation:  
        {
        longitude: '',
        latitude: '',
        timestamp: '',
        },
    runnersJoinedCount: 0,
    runnersJoined:[
        {
            ID: 1,
            pace: '8:55',
            distance: '2.3',
            time: '2:55',

        }, 
        {
            ID: 2,
            pace: '7:55',
            distance: '2.3',
            time: '2:58',

        },
    ]
};
//need to array with user data here, map over to count instead of having number variable

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
    if (action.type === "Add_TO_COUNT"){
        new_state.runnersJoinedCount++;
    }

    return new_state;
    
}

export default runRoyalReducer;