import { serverError, sendResponse, badRequest } from "../utils/utils"
import { setTimer, deleteTimer } from "../utils/timers";
import bookingsModel from "../models/bookings.model";
import parkingSlotsModel from "../models/parking-slots.model";
import activeBookingsModel from "../models/active-bookings.model.js";
const stripe = require("stripe")("sk_test_iujYGbaS1mqcc11xteaduhO5006SripqU8");


export const getUserBookings = async (req, res) => {
    try {
        const { user: { id } } = req;
        const bookings = await bookingsModel.find({ userId: id }).sort({ _id: -1 })
        return sendResponse(res, bookings);
    } catch (error) {
        serverError(res, error)
    }
}

export const getUserActiveBookings = async (req, res) => {
    try {
        const { user: { id } } = req;
        const bookings = await activeBookingsModel.find({ userId: id });
        sendResponse(res, bookings)
    } catch (error) {
        serverError(res, error);
    }
}

export const getParkingSlots = (req, res) => {
    try {
        const parkings = parkingSlotsModel.find({})
        return sendResponse(parkings);
    } catch (error) {
        serverError(res, error)
    }
}

export const postBookSlot = async (req, res) => {
    try {
        let { body: { parkingId, slotNumber, from, to, tokenId }, user: { id, email } } = req;
        from = new Date(from);
        to = new Date(to);
        const parkingDeatil = await parkingSlotsModel.findOne({ _id: parkingId, slots: { $gte: slotNumber } })
        if (!parkingDeatil) return badRequest(res, 'No slot found');
        const bookings = await activeBookingsModel.aggregate([
            {
                $match: {
                    parkingId,
                    slotNumber: parseInt(slotNumber),
                }
            },
            {
                $match: {
                    $expr: {
                        $or: [
                            {
                                $and: [{ $gte: [from, '$from'] }, { $lte: [from, '$to'] }]
                            },
                            {
                                $and: [{ $gte: [to, '$from'] }, { $lte: [to, '$to'] }]
                            },
                            {
                                $and: [{ $lte: [from, '$from'] }, { $gte: [to, '$to'] }]
                            }
                        ]
                    }
                }
            },
            {
                $limit: 1
            }
        ]);
        if (bookings[0]) return badRequest(res, 'Slot has already booked');
        const payment = await stripe.charges.create({
            amount: parseInt(Math.abs(new Date(from) - new Date(to)) / 60000) * 100,
            currency: "usd",
            description: "An example charge",
            source: tokenId
        });
        const newBooking = await new activeBookingsModel({
            userId: id,
            parkingId,
            from,
            to,
            slotNumber,
            name: parkingDeatil.name,
            payment: payment.id
        }).save();
        setTimer(newBooking._id, to, from, email);
        sendResponse(res, newBooking);
    } catch (error) {
        serverError(res, error);
    }
}


export const checkSlot = async (req, res) => {
    try {
        let { body: { parkingId, slotNumber, from, to }, user: { id, email } } = req;
        from = new Date(from);
        to = new Date(to);
        const parkingDeatil = await parkingSlotsModel.findOne({ _id: parkingId, slots: { $gte: slotNumber } })
        if (!parkingDeatil) return badRequest(res, 'No slot found');
        const bookings = await activeBookingsModel.aggregate([
            {
                $match: {
                    parkingId,
                    slotNumber: parseInt(slotNumber),
                }
            },
            {
                $match: {
                    $expr: {
                        $or: [
                            {
                                $and: [{ $gte: [from, '$from'] }, { $lte: [from, '$to'] }]
                            },
                            {
                                $and: [{ $gte: [to, '$from'] }, { $lte: [to, '$to'] }]
                            },
                            {
                                $and: [{ $lte: [from, '$from'] }, { $gte: [to, '$to'] }]
                            }
                        ]
                    }
                }
            },
            {
                $limit: 1
            }
        ]);
        if (bookings[0]) return badRequest(res, 'Slot has already booked');
        sendResponse(res);
    } catch (error) {
        serverError(res, error)
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const { params: { bookingId } } = req;
        let booking = await activeBookingsModel.findByIdAndRemove(bookingId);
        if (!booking) return badRequest(res, 'No record found');
        deleteTimer(bookingId);
        booking = new bookingsModel({ ...booking.toObject(), status: false }).save();
        sendResponse(res, booking);
    } catch (error) {
        serverError(res, error);
    }
}

export const getSlotDetails = async (req, res) => {
    try {
        const { params: { slotId } } = req;
        const slot = await parkingSlotsModel.findById(slotId);
        sendResponse(res, slot.toObject());
    } catch (error) {
        serverError(res, error)
    }
}

export const getAllCompletedBookings = async (req, res) => {
    try {
        const bookings = await bookingsModel.aggregate([{
            $match: {}
        },
        {
            $lookup: {
                from: 'users',
                let: { userId: '$userId' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$_id', '$$userId']
                        }
                    }
                }, {
                    $project: {
                        password: 0
                    }
                }],
                as: 'user'
            }
        }]);
        sendResponse(res, bookings);
    } catch (error) {
        serverError(res, error);
    }
}

export const getAllActiveBookings = async (req, res) => {
    try {
        const bookings = await activeBookingsModel.aggregate([{
            $match: {}
        },
        {
            $lookup: {
                from: 'users',
                let: { userId: '$userId' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$_id', '$$userId']
                        }
                    }
                }, {
                    $project: {
                        password: 0
                    }
                }],
                as: 'user'
            }
        }]);
        sendResponse(res, bookings);
    } catch (error) {
        serverError(res, error)
    }
}