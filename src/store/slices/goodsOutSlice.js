import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    goodsout: {},
    // allgoodsOutsId: [],
}


const goodOutEntity = new schema.Entity('goodsout', {}, {
    idAttribute: 'GOId'
});
const goodOutListSchema = new schema.Array(goodOutEntity);

const goodsout = createSlice({
    name: 'goodsout',
    initialState,
    reducers: {
        getAllGoodsOutSuccess: (state, action) => {
            const { GetListofGoodsOutRecordByDate } = action.payload;
            let normalizedgoodOutData = normalize(GetListofGoodsOutRecordByDate, goodOutListSchema)
            // state.allgoodsOutsId = normalizedgoodOutData.result;
            state.goodsout = normalizedgoodOutData.entities.goodsout
        }
    }
})

export const {
    getAllGoodsOutSuccess
} = goodsout.actions;

export default goodsout.reducer;