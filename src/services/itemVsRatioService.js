import { InsertUpdateItemVsTestRatio, GetListOfItemVsTestRatio, GetListOfTestForInventory } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getItemVsRatioApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListOfItemVsTestRatio}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetListOfItemVsTestRatio);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertItemVsRatioApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateItemVsTestRatio, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}

export const getTestListApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListOfTestForInventory}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetListOfTestForInventory);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}