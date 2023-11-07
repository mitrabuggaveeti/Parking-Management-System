import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { serverError, badRequest, sendResponse } from "../utils/utils";
import { SECRET_KEY } from '../utils/constants';
import usersModel from '../models/users.model';

export const postUserLogin = async (req, res) => {
    try {
        const { email = '', password = '' } = req.body;
        const user = await usersModel.findOne({ email });
        if (!user) return badRequest(res, 'User not found');
        bcryptjs.compare(password, user.password, (err, sucess) => {
            if (err) return serverError(res, err);
            if (!sucess) return badRequest(res, 'Invalid credentials');
            const token = jwt.sign({ id: user._id }, SECRET_KEY);
            return sendResponse(res, token);
        });
    } catch (error) {
        serverError(res, error);
    }
}

export const postRegisterUser = (req, res) => {
    const { email, password,adharNumber } = req.body;
    usersModel.findOne({ email },async (err, user) => {
        if (err) return serverError(res)
        if (user) return badRequest(res, 'user already exists with this email');
        const adhar = await usersModel.findOne({adharNumber:parseInt(adharNumber)});
        if(adhar) return badRequest(res, 'user already exists with this adhar number');
        bcryptjs.genSalt(10, (err, salt) => {
            if (err) return serverError(res);
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) return serverError(res);
                new usersModel({
                    email,
                    password: hash,
                    role: 'user',
                    adharNumber
                }).save().then(() => sendResponse(res)).catch(err => {
                    console.log('error while registering user', err);
                    return serverError(res);
                })
            })
        })
    })
}

export const getUserDetails = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await usersModel.findById(id);
        if (!user) return badRequest(res, 'User not found');
        sendResponse(res, { ...user.toObject(), password: null });
    } catch (error) {
        serverError(res, error);
    }
}