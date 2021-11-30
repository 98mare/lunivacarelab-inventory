import { GetItemCategory, InsertUpdateItemCategory } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getItemCategoryApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetItemCategory);
            if(response?.status === 200)
                successCallback(response?.data?.ItemGategory);
            else
                successCallback([])
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