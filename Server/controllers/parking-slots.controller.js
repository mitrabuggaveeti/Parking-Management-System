import { serverError, sendResponse } from "../utils/utils"
import parkingSlotsModel from "../models/parking-slots.model";

export const postParkingSlot = async (req, res) => {
    try {
        const { body: { name, slots } } = req;
        const parkingSlot = await new parkingSlotsModel({ name, slots }).save();
        sendResponse(res, parkingSlot);
    } catch (error) {
        serverError(res, error)
    }
}

export const deleteParkingSlot = async (req, res) => {
    try {
        const { params: { slotId } } = req;
        await parkingSlotsModel.findByIdAndDelete(slotId);
        sendResponse(res);
    } catch (error) {
        serverError(res, error)
    }
}

export const getParkingSlots = async (req, res) => {
    try {
        const slots = await parkingSlotsModel.find();
        sendResponse(res, slots)
    } catch (error) {
        serverError(res, error)
    }
}