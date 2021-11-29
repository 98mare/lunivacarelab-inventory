import { RackDetailsByLocationId } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getRackDetApi = (location, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${RackDetailsByLocationId}?location=${location}`);
            if(response?.status === 200)
                successCallback(response?.data?.RackDetailsByLocationId);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}