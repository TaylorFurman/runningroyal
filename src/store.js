import { createStore } from 'redux';
import runRoyalReducer from './reducer.js';

var store = createStore(runRoyalReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store; 