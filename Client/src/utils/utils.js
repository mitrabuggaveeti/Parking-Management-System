import { SUCCESS, FAILURE, NETWORK_ERROR } from "./constants";

export const resolveByType = ({ type, success, failure }) => {
    if (type === SUCCESS) {
        success && success();
    } else if (type === FAILURE) {
        failure && failure();
    }
}

export const checkLoading = (loadingInfo) => {
    if (loadingInfo === null) return null;
    if (!loadingInfo) return true;
    return false;
}

export const windowLocation = () => window.location.href;


export const checkError = (error, callback) => {
    console.log(error);
    if (!error.response || !error.response.status) return callback && callback({
        type: FAILURE,
        message: NETWORK_ERROR
    });
    return callback && callback({
        type: FAILURE,
        message: error.response.data.message
    })
}

export const sendCallback = (callback) => {
    callback && callback({
        type: SUCCESS
    })
}