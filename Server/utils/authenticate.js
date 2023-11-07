import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './constants';
import { badRequest } from './utils';
import usersModel from '../models/users.model';

export const isUserLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const result = jwt.verify(token, SECRET_KEY);
        const user = await usersModel.findById(result.id);
        if (!user) badRequest(res, 'Not authorized');
        // eslint-disable-next-line require-atomic-updates
        req.user = {id:user._id,email:user.email};
        next();
    } catch (error) {
        console.log(error)
        badRequest(res, 'Not authorized');
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const result = jwt.verify(token, SECRET_KEY);
        const user = await usersModel.findById(result.id);
        if (!user || user.role !== 'admin') badRequest(res, 'Not authorized');
        // eslint-disable-next-line require-atomic-updates
        req.user = result;
        next();
    } catch (error) {
        badRequest(res, 'Not authorized');
    }
}