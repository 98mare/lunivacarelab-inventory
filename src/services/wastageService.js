import { InsertUpdateWastageDetails, GetlistOfwastageDetailsByDate } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getWastageApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetlistOfwastageDetailsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetlistOfwastageDetailsByDate);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertWastageApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateWastageDetails, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}
