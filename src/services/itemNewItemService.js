import { GetListOfLabItemsDetailsByTypeId, InsertUpdateNewItemsDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getLabItemsApi = (data, successCallback) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(data)
            let newUrl = `${GetListOfLabItemsDetailsByTypeId}?${formData}`
            const response = await fetch(newUrl);
            if(response?.status === 200)
                successCallback(response?.data?.GetListOfLabItemsDetailsByTypeId);
            else
                successCallback([])
        } catch (error) {

        }

    }
}

export const insertNewItemDetailsApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateNewItemsDetails, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}
