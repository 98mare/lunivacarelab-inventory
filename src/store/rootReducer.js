import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import goodsInSlice from './slices/goodsInSlice';
<<<<<<< HEAD
import goodsOutSlice from './slices/goodsOutSlice';
=======
import itemRatioSlice from './slices/itemRatioSlice';
import locationSlice from './slices/locationSlice';
>>>>>>> 9b5a9fda94dea5d39465548d571cbdeb84e4570b
import rackSlice from './slices/rackSlice';
import typeSlice from './slices/typeSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    units: unitSlice,
    category: categorySlice,
<<<<<<< HEAD
    goodsin: goodsInSlice,
    goodsout: goodsOutSlice,
    racks: rackSlice
=======
    goodsin: goodsInSlice, 
    racks: rackSlice,
    locations: locationSlice,
    itemTypes: typeSlice,
    itemRatio: itemRatioSlice,
    
>>>>>>> 9b5a9fda94dea5d39465548d571cbdeb84e4570b
})

export default rootReducer