import { GetCurrentRemainingStockCountById} from '../constants/url'
import { fetch } from '../utils/httpUtil';


export const getStockApi = (data, sucesCallback) => {
  return async dispatch => {
      try{
        const response = await fetch(`${GetCurrentRemainingStockCountById}`);
        if(response?.status === 200){
          sucesCallback(response?.data?.GetCurrentRemainingStockCountById)
        }
        else
          sucesCallback([])

      }catch(error){

      }
  }
}