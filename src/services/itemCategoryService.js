import { GetItemCategory, InsertUpdateItemCategory } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getItemCategoryApi = (catId = 0, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetItemCategory);
            successCallback(response?.data);
        } catch (error) {
            
        }

    }
}

export const insertItemCategoryApi = (params, returnData) => {
    return async dispatch => {
        try {
            let data = {
                "CId": 0,
                "CategoryType": "Updated Cate",
                "IsActive": true
            }
            let formData = generateUrlEncodedData(data)
            const response = await store(InsertUpdateItemCategory, formData);
            console.log(response);
        } catch (error) {

        }

    }
}
