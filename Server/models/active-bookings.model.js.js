import { Schema, model } from "mongoose";

const activeBookingsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    name: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    parkingId: {
        type: String,
        ref: 'parkingslots',
        required: true,
        index: true
    },
    slotNumber: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
    },
    payment: {
        // required: true,
        type: String
    }
});

activeBookingsSchema.index({ userId: 1, slotNumber: 1 });
activeBookingsSchema.index({ parkingId: 1, slotNumber: 1, from: -1 });
activeBookingsSchema.index({ parkingId: 1, slotNumber: 1, to: -1 });

export default model('activebookings', activeBookingsSchema);