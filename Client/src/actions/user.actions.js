import axios from 'axios';
import { postUserLogin, getUserDetails, postUserRegister, getUserBookings, getUserActiveBookings, deleteUserBooking, postUserBooking, getSlotDetails, postPaymentValidate, checkUserBooking, getAllBookings, getAllActiveBookings } from '../services/user.services';
import { sendCallback, checkError } from '../utils/utils';
import { setUserProfile, loginSucess, setSessionLoading, logoutSucess } from '../redux/session.reducer';
import { setUserBookings, setUserActiveBookings, setSelectedSlot, setParkingSlots } from '../redux/user.reducer';
import { getParkingSlots } from '../services/admin.services';
export const userLoginAction = (info, callback) => async (dispatch, getState) => {
    try {
        const res = await postUserLogin(info);
        localStorage.setItem('authtoken', `Bearer ${res.data}`);
        await dispatch(userDetailsAction());
        sendCallback(callback);
    } catch (error) {
        checkError(error, callback);
    }
}

export const userDetailsAction = (callback) => async (dispatch, getState) => {
    try {
        axios.defaults.headers['Authorization'] = localStorage.getItem('authtoken');
        const res = await getUserDetails();
        dispatch(setUserProfile(res.data));
        dispatch(loginSucess());
        dispatch(setSessionLoading(false))
        sendCallback(callback);
    } catch (error) {
        checkError(error, callback);
        dispatch(setSessionLoading(false))
    }
}

export const userRegisterAction = (info, callback) => async (dispatch, getState) => {
    try {
        await postUserRegister(info);
        sendCallback(callback);
    } catch (error) {
        checkError(error, callback);
    }
}

export const userLogoutAction = (callback) => async (dispatch, getSatate) => {
    await dispatch(logoutSucess())
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem('authtoken');
    dispatch(setSessionLoading(false));
    sendCallback(callback);
}

export const userBookingsAction = (callback) => async (dispatch, getState) => {
    try {
        const res = await getUserBookings();
        dispatch(setUserBookings(res.data));
        sendCallback(callback);
    } catch (error) {
        dispatch(setUserBookings(null))
        checkError(error, callback)
    }
}

export const userActiveBookingsAction = (callback) => async (dispatch, getState) => {
    try {
        const res = await getUserActiveBookings();
        dispatch(setUserActiveBookings(res.data));
        sendCallback(callback);
    } catch (error) {
        dispatch(setUserActiveBookings(null));
        checkError(error, callback)
    }
}

export const deleteBookingAction = ({ bookingId }, callback) => async (dispatch, getState) => {
    try {
        const { user: { activeBookings } } = getState();
        await deleteUserBooking(bookingId);
        dispatch(setUserActiveBookings(activeBookings.filter(boo => boo._id !== bookingId)));
        sendCallback(callback);
    } catch (error) {
        checkError(error, callback)
    }
}

export const addBooking = (info, callback) => async (dispatch, getState) => {
    try {
        const { user: { activeBookings } } = getState();
        let res;
        if (!info.check) {
            res = await postUserBooking(info);
        }
        else {
            res = await checkUserBooking(info);

        }
        if (info.check) {
            dispatch(setUserActiveBookings(activeBookings ? [res.data, ...activeBookings] : [res.data]));
        }
        sendCallback(callback)
    } catch (error) {
        checkError(error, callback);
    }
}

export const parkingSlotDetails = ({ slotId }, callback) => async (dispatch, getState) => {
    try {
        const res = await getSlotDetails(slotId);
        dispatch(setSelectedSlot(res.data));
        sendCallback(callback);
    } catch (error) {
        dispatch(setSelectedSlot(null));
        checkError(error, callback);
    }
}

export const allParkingSlots = (callback) => async (dispatch, getState) => {
    try {
        const res = await getParkingSlots();
        dispatch(setParkingSlots(res.data));
        sendCallback(callback)
    } catch (error) {
        checkError(error, callback);
        dispatch(setParkingSlots(null))
    }
}


export const allBookings = (callback) => async (dispatch, getState) => {
    try {
        const res = await getAllBookings();
        dispatch(setUserBookings(res.data));
        sendCallback(callback)
    } catch (error) {
        dispatch(setUserBookings(null))
        checkError(error, callback)
    }
}

export const allActiveBookings = (callback) => async (dispatch, getState) => {
    try {
        const res = await getAllActiveBookings();
        dispatch(setUserActiveBookings(res.data));
    } catch (error) {
        dispatch(setUserActiveBookings(null))
        checkError(error, callback)
    }
}