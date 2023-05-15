import { combineReducers } from 'redux';
import gearReducer from './GearSlice';
import userReducer from './UserSlice';
import filteredGearReducer from './filteredGearSlice';
import MessageReducer from './MessageSlice'

const rootReducer = combineReducers({
  Gear: gearReducer,
  User: userReducer,
  FilteredGear: filteredGearReducer,
  Message: MessageReducer,
});

export default rootReducer;
