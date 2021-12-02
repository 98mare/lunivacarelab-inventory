import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import goodsInSlice from './slices/goodsInSlice';
import itemRatioSlice from './slices/itemRatioSlice';
import locationSlice from './slices/locationSlice';
import rackSlice from './slices/rackSlice';
import typeSlice from './slices/typeSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    units: unitSlice,
    category: categorySlice,
    goodsin: goodsInSlice, 
    racks: rackSlice,
    locations: locationSlice,
    itemTypes: typeSlice,
    itemRatio: itemRatioSlice,
    
})

export default rootReducer