import { fetch } from '../utils/httpUtil';
// import { generateUrlEncodedData } from '../utils/generateFormData';

export const getLoginApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch
            (`CheckValidLoginForInventory?username=${data.user}&password=${data.pass}`);
            if(response?.status === 200)
                successCallback(response?.data);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}
// GET Api/CheckValidLoginForInventory?username={username}&password={password}
// (`GetValidUserByUserNameandPassword?user=${data.user}&password=${data.pass}`);