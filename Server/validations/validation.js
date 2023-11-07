import validator, { EMAIL, STRING, OBJECTID, NUMBER } from "./validator";
import { badRequest } from "../utils/utils";

export const isValidRegisterForm = (req, res, next) => {
    const { email = '', password = '' } = req.body;
    const options = [
        { key: 'email', value: email, type: EMAIL },
        { key: 'password', value: password, type: STRING, min: 6, max: 30 },
    ]
    const formDetails = validator(options);
    if (!formDetails.isValidForm) return res.status(400).json(formDetails);
    next();
}

export const isValidLoginForm = (req, res, next) => {
    const { email = '' } = req.body;
    const options = [
        { key: 'email', value: email, type: EMAIL }
    ]
    const formDetails = validator(options);
    if (!formDetails.isValidForm) return res.status(400).json(formDetails);
    next();
}

export const isValidBookingForm = (req, res, next) => {
    const { parkingId, slotNumber } = req.body;
    const options = [
        { key: 'parkingId', value: parkingId, type: OBJECTID },
        { key: 'slotNumber', value: slotNumber, type: NUMBER, min: 1 }
    ];
    const formDetails = validator(options);
    if (!formDetails.isValidForm) return badRequest(res, formDetails);
    next();
}