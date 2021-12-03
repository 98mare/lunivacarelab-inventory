import { InsertUpdateLabGoodReceived, GetGoodReceivedDetailsByDate } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllGoodsInSucess } from '../store/slices/goodsInSlice';

export const getGoodsReceivedApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetGoodReceivedDetailsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetGoodReceivedDetailsByDate);
                dispatch(getAllGoodsInSucess(response?.data))
            }else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertGoodsReceivedApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateLabGoodReceived, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}
