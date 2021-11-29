import { InsertUpdateUnits, GetUnitsDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getItemUnitApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetUnitsDetails);
            if(response?.status === 200)
                successCallback(response?.data?.units);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertItemUnitApi = (params, returnData) => {
    return async dispatch => {
        try {
            let data = {
                "UnId": 1,
                "Units": "sample string 2",
                "IsActive": true
              }
            const response = await store(InsertUpdateUnits, data);
            console.log(response);
        } catch (error) {

        }

    }
}