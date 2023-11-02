const intialState = {
    activeBookings: undefined,
    bookings: undefined
}

const SET_USER_ACTIVE_BOOKINGS = 'SET_USER_ACTIVE_BOOKINGS';
const LOGIN_SUCESS = 'LOGGIN_SUCCESS';
const LOGOUT_SUCESS = 'LOGOUT_SUCESS';
const SET_USER_BOOKINGS = 'SET_USER_BOOKINGS';
const SET_PARKING_SLOTS = 'SET_PARKING_SLOTS';
const SET_SELECTED_SLOT = 'SET_SELECTED_SLOT';


export const setUserActiveBookings = (activeBookings) => ({
    type: SET_USER_ACTIVE_BOOKINGS,
    activeBookings
});

export const setParkingSlots = (parkingSlots) => ({
    type: SET_PARKING_SLOTS,
    parkingSlots
});

export const setUserBookings = (bookings) => ({
    type: SET_USER_BOOKINGS,
    bookings
});

export const setSelectedSlot = (selectedSlot) => ({
    type: SET_SELECTED_SLOT,
    selectedSlot
})

const userReducer = (user = intialState, action) => {
    switch (action.type) {
        case LOGIN_SUCESS:
            return {
                ...user,
                loggedIn: true
            }
        case LOGOUT_SUCESS:
            return {
                ...intialState
            }
        case SET_USER_ACTIVE_BOOKINGS:
            return {
                ...user,
                activeBookings: action.activeBookings
            }
        case SET_USER_BOOKINGS:
            return {
                ...user,
                bookings: action.bookings
            }
        case SET_PARKING_SLOTS:
            return {
                ...user,
                parkingSlots: action.parkingSlots
            }
        case SET_SELECTED_SLOT:
            return {
                ...user,
                selectedSlot: action.selectedSlot
            }
        default:
            return user
    }
}

export default userReducer;