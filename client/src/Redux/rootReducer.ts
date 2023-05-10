import { combineReducers } from 'redux';
import gearReducer from './GearSlice';
import userReducer from './UserSlice';

const rootReducer = combineReducers({
  Gear: gearReducer,
  User: userReducer
});

export default rootReducer;