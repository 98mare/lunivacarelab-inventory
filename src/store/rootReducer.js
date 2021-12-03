import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import goodsInSlice from './slices/goodsInSlice';
import goodsOutSlice from './slices/goodsOutSlice';
import itemRatioSlice from './slices/itemRatioSlice';
import locationSlice from './slices/locationSlice';
import newItemSlice from './slices/newItemSlice';
import rackSlice from './slices/rackSlice';
import typeSlice from './slices/typeSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';
import wastageSlice from './slices/wastageSlice';

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
    wastage: wastageSlice,
    newItem: newItemSlice,
})

export default rootReducer