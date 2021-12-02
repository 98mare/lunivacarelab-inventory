import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    units: unitSlice,
    category: categorySlice
})

export default rootReducer