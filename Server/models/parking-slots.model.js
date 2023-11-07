import { Schema, model } from "mongoose";

const parkingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slots: {
        type: Number,
        required: true
    }
});

export default model('parkingslots', parkingSchema);