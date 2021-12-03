import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import goodsInSlice from './slices/goodsInSlice';

import goodsOutSlice from './slices/goodsOutSlice';

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
    goodsout: goodsOutSlice, 
    racks: rackSlice,
    locations: locationSlice,
    itemTypes: typeSlice,
    itemRatio: itemRatioSlice,
    
})

export default rootReducer