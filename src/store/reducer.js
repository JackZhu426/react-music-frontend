import reommendReducer from '../pages/discover/discover-pages/recommendation/store';
import playerReducer from '../pages/player/store';
// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';

const reducer = combineReducers({
  recommendInfo: reommendReducer,
  playerInfo: playerReducer,
});

export default reducer;
