import { InsertUpdateUnits, GetUnitsDetails } from '../constants/url';

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