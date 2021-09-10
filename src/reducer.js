import deepcopy from 'deepcopy';

var initialState = {
    runnerLocation:  
        {
        longitude: '',
        latitude: '',
        timestamp: '',
        }
};

export function runRoyalReducer (state, action) {
    if (state === undefined) {
        return initialState;
    }
    let new_state = deepcopy(state);  
   
    //leaving this as an example, need to change for run royal
    // if (action.type === 'TOGGLE_CHECKED_SHOP') {
    //     new_state.shopping_list[action.data.index].isChecked = !state.shopping_list[action.data.index].isChecked;
    // }
    
    if (action.type === "GET_LOCATION"){
        console.log(action);
        new_state.runnerLocation(action.data);
        console.log(new_state + "1");
    }

    return new_state;
    
}

export default runRoyalReducer;