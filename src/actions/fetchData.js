import axios from "axios";
import { fetchDataError, fetchDataSuccess, fetchDataRequest } from "./actionFetchData";


export const fetchData = (api, method, params) => {
    return dispatch => {
        dispatch(fetchDataRequest(api, params));
        let instance = axios.create()
        if (method === "POST") {
            return instance.post(api, params)
            .catch(err => {
                dispatch(fetchDataError(err));
                return err;
            })
            .then(res => {
                dispatch(fetchDataSuccess(res.data))
                return res.data
            })
        }
        else {
            return instance.get(api)
                .catch(err => {
                    dispatch(fetchDataError(err));
                    return err;
                })
                .then(res => {
                    dispatch(fetchDataSuccess(res.data));
                    return res.data;
                })
        }
    };
}