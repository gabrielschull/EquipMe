import { combineReducers } from 'redux';
import gearReducer from './GearSlice';
import userReducer from './UserSlice';
import filteredGearReducer from './filteredGearSlice';
import MessageReducer from './MessageSlice'
import Rentalreducer from './rentalSlice'
import ChatReducer from './ChatSlice'

const rootReducer = combineReducers({
  Gear: gearReducer,
  User: userReducer,
  FilteredGear: filteredGearReducer,
  Message: MessageReducer,
  Rental:Rentalreducer,
  Chat: ChatReducer,
});

export default rootReducer;
