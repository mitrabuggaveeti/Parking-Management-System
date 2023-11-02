import { makeRequest, GET, POST, DELETE } from "../utils/fetch";

export const postUserLogin = (body) => {
    return makeRequest(POST, '/user/login', body);
}

export const getUserDetails = (body) => {
    return makeRequest(GET, '/user/ping');
}

export const postUserRegister = (body) => {
    return makeRequest(POST, `/user/register`, body);
}

export const getUserBookings = () => {
    return makeRequest(GET, `/bookings`);
}

export const getUserActiveBookings = () => {
    return makeRequest(GET, '/bookings/active');
}

export const deleteUserBooking = (id) => {
    return makeRequest(DELETE, `/bookings/${id}`);
}

export const postUserBooking = (body) => {
    return makeRequest(POST, '/bookings', body);
}
export const checkUserBooking = (body) => {
    return makeRequest(POST, '/bookings/check', body);
}


export const getSlotDetails = (id) => {
    return makeRequest(GET, `/bookings/slot/${id}`);
}

export const postPaymentValidate = (body) => {
    return makeRequest(POST, '/payment/validate', body);
}

export const getAllBookings = () => {
    return makeRequest(GET, '/bookings/all');
}

export const getAllActiveBookings = () => {
    return makeRequest(GET, '/bookings/all-active')
}