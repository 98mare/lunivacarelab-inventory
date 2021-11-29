import { GetLocationDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getLocationApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetLocationDetails);
            if(response?.status === 200)
                successCallback(response?.data?.LocationDetails);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}