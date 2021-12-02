import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import goodsInSlice from './slices/goodsInSlice';
import goodsOutSlice from './slices/goodsOutSlice';
import rackSlice from './slices/rackSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    units: unitSlice,
    category: categorySlice,
    goodsin: goodsInSlice,
    goodsout: goodsOutSlice,
    racks: rackSlice
})

export default rootReducer