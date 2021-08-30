import deepcopy from 'deepcopy';

var initialState = {
    
};

export function runRoyalReducer (state) {
    if (state === undefined) {
        return initialState;
    }

    let new_state = deepcopy(state);  
   
    //leaving this as an example, need to change for run royal
    // if (action.type === 'TOGGLE_CHECKED_SHOP') {
    //     new_state.shopping_list[action.data.index].isChecked = !state.shopping_list[action.data.index].isChecked;
    // }
    return new_state;
}

export default runRoyalReducer;