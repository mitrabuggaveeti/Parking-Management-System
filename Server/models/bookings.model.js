import { Schema, model } from "mongoose";

const bookingsSchema = new Schema({
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
        type: Schema.Types.ObjectId,
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
    status: {
        type: Boolean,
        required: true,
        enum: [true, false]
    },
    payment: {
        // required: true,
        type: String
    }
});

bookingsSchema.index({ userId: 1, from: -1 });

export default model('bookings', bookingsSchema);