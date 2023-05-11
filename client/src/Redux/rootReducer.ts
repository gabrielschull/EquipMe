import { combineReducers } from 'redux';
import gearReducer from './GearSlice';
import userReducer from './UserSlice';
import filteredGearReducer from './filteredGearSlice';

const rootReducer = combineReducers({
  Gear: gearReducer,
  User: userReducer,
  FilteredGear: filteredGearReducer,
});

export default rootReducer;
