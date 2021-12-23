import { GetListOfTestByTypeForBulkUpdate, GetTestType, GetDatewiseRequestorTransactionDetails, GetRequestorList, GetReferedDoctorList, GetRequestorwiseTotalSalesSummaryByDate, GetDatewiseReferredDoctorTransactionDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';

export const getTestTypeReport = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await store(`${GetListOfTestByTypeForBulkUpdate}?testTypeId=${data.testType}`);
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
            const response = await fetch(`${GetDatewiseReferredDoctorTransactionDetails}?from=${data.fromdate}&to=${data.todate}&refId=${data.reqid}`);
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
            const response = await fetch(`${GetDatewiseRequestorTransactionDetails}?from=${data.fromdate}&to=${data.todate}&reqId=${data.reqid}`);
            if (response?.status === 200) {
                successCallback([])
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}

export const getRequestorTotalSalesReport = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetRequestorwiseTotalSalesSummaryByDate}?from=${data?.fromdate}&to=${data?.todate}`);
            if (response?.status === 200) {
                successCallback(response?.data?.ReportDetails)
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
            if (response?.status === 200) {
                successCallback(response?.data?.ReportType)
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}

export const getGetRefererList = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetReferedDoctorList);
            if (response?.status === 200) {
                successCallback(response?.data?.ReportType)
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}

export const getGetTestTypeList = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(GetTestType);
            if (response?.status === 200) {
                successCallback(response?.data?.TestType)
            } else {
                successCallback([])
            }
        } catch (error) {

        }
    }
}