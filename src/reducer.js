import { Satellite } from '@material-ui/icons';
import deepcopy from 'deepcopy';
import {io} from 'socket.io-client';
import store from './store.js';

let apiUrl = (process.env.API_URL || 'http://localhost:3700');

function updateRooms(data){
    return{
        type: "UPDATE_ROOMS",
        data: data
    }
}

function openSocket(){
    var socket = io(apiUrl);

    console.log('socket', socket);
    socket.on('connect', () => {
        console.log('connected');
    });

    socket.on('rooms_data', (msg) => {
        console.log(msg);
        store.dispatch(updateRooms(msg));
    });

    return socket;
}

var initialState = {
    runnerLocation:  
        {
        longitude: '',
        latitude: '',
        timestamp: '',
        },
    runnersJoinedCount: 0,
    currentUserID: 1,
    runnersJoined:[],
    rooms: []
};

export function runRoyalReducer (state, action) {
    if (state === undefined) {
        var socket = openSocket();
        let new_state = deepcopy(initialState);
        new_state.socket = socket;
        return new_state;
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
        new_state.runnersJoined.push({ID: action.data.ID});
    }

    if (action.type === "UPDATE_ROOMS"){
        new_state.rooms = action.data.rooms;
    }

    return new_state;
    
}

export default runRoyalReducer;