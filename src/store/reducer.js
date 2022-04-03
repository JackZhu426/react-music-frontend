// import { combineReducers } from 'redux';
import reommendReducer from '../pages/discover/discover-pages/recommendation/store';
import { combineReducers } from 'redux-immutable';

const reducer = combineReducers({ recommendInfo: reommendReducer });

export default reducer;