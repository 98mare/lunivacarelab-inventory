import { GetManufactureDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getManuDetApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetManufactureDetails);
            if(response?.status === 200)
                successCallback(response?.data?.GetManufactureDetails);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}