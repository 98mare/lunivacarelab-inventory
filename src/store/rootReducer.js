import { combineReducers } from 'redux';
import rackSlice from './slices/rackSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    units: unitSlice,
    racks: rackSlice
})

export default rootReducer