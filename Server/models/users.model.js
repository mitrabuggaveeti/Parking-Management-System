import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 3,
        max: 60
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    },
    adharNumber:{
        type:Number,
        required:true
    }
});

export default model('users', userSchema);