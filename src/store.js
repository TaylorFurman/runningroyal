import { createStore } from 'redux';
import runRoyalReducer from './reducer.js';

  var store = createStore(runRoyalReducer);

export default store; 