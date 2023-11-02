import { checkError, sendCallback } from "../utils/utils"
import { postParkingSlot, deleteParkingSlot } from "../services/admin.services"
import { setParkingSlots } from "../redux/user.reducer";

export const addParkingSlotAction = (info, callback) => async (dispatch, getState) => {
    try {
        const { user: { parkingSlots } } = getState();
        const res = await postParkingSlot(info);
        dispatch(setParkingSlots(parkingSlots ? [res.data, ...parkingSlots] : [res.data]));
        sendCallback(callback);
    } catch (error) {
        checkError(error, callback)
    }
}

export const removeParkingSlotAction = ({ parkingId }, callback) => async (dispatch, getState) => {
    try {
        const { user: { parkingSlots } } = getState();
        await deleteParkingSlot(parkingId);
        dispatch(setParkingSlots(parkingSlots.filter(slot => slot._id !== parkingId)));
        sendCallback(callback);
    } catch (error) {
        checkError(error, callback)
    }
}