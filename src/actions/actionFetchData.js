export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";


export const fetchDataRequest = (api, params) => ({
    type: FETCH_DATA_REQUEST,
    api,
    params
})


export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    data
})


export const fetchDataError = (error) => ({
    type: FETCH_DATA_ERROR,
    error
})