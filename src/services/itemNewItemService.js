import { GetListOfLabItemsDetailsByTypeId, InsertUpdateNewItemsDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getLabItemsApi = (catId = 0, successCallback) => {
    return async dispatch => {
        try {
            let data = {
                fromdate: '2021-11-01',
                todate: '2021-11-28',
            }
            let formData = generateUrlEncodedData(data)
            let newUrl = `${GetListOfLabItemsDetailsByTypeId}?${formData}`
            const response = await fetch(newUrl);
            successCallback(response?.data);
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
