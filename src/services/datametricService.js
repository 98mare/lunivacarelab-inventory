import { GetDatewiseRequestorTransactionDetails, GetRequestorList, GetReferedDoctorList } from '../constants/url';
import { fetch } from '../utils/httpUtil';

export const getTestTypeReport = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch();
            if (response?.status === 200) {
                successCallback([])
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}

export const getReferReport = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch();
            if (response?.status === 200) {
                successCallback([])
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}

export const getRequestorReport = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetDatewiseRequestorTransactionDetails}?from=2021-09-01&to=2021-12-22&reqId=0`);
            if (response?.status === 200) {
                successCallback([])
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}

export const getGetRequestorList = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetRequestorList);
            if(response?.status === 200){
                successCallback(response?.data?.ReportType)
            }else{
                successCallback([])
            }
        }catch(error){

        }
    }
}

export const getGetRefererList = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetReferedDoctorList);
            if(response?.status === 200){
                successCallback(response?.data?.ReportType)
            }else{
                successCallback([])
            }
        }catch(error){

        }
    }
}