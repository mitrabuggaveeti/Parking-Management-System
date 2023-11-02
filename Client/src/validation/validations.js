import validator, { TEXT, EMAIL, PASSWORD, NUMERIC } from "./validator";
import { toast } from "react-toastify";

export const isValidRegisterForm = ({ email = '', password = '', adharNumber = '' }) => {
    const options = [
        { type: EMAIL, value: email, key: 'email', min: 1 },
        { type: PASSWORD, value: password, min: 1, max: 20, key: 'password' },
        { type: NUMERIC, value: adharNumber, min: 12, max: 12, key: 'adharNumber' }
    ]
    const isValidForm = validator(options);
    if (!isValidForm.errors.adharNumber) {
        if (adharNumber.length !== 12) {
            isValidForm.errors.adharNumber = 'Enter a valid number';
            isValidForm.isValidForm = false
        }
    }
    return isValidForm;
}

export const isValidLoginForm = ({ email = '', password = '' }) => {
    const options = [
        { type: EMAIL, value: email, key: 'email', min: 1 },
        { type: PASSWORD, value: password, min: 1, max: 20, key: 'password' },
    ]
    return validator(options);
}


export const isValidBookingForm = ({ from, to }) => {
    const errors = { isValidForm: true, errors: {} };
    if (!from || !to) {
        toast.error('Please select valid dates');
        return { isValidForm: false, errors: {} }
    }
    const date = new Date();
    from = new Date(from);
    to = new Date(to);
    if (from && from.getTime() < date.getTime()) {
        errors.errors.from = 'Enter a valid date';
        errors.isValidForm = false;
    }
    if (from && to && from.getTime() >= to.getTime()) {
        errors.errors.to = 'Enter a valid date';
        errors.isValidForm = false;
    }
    if (from && Math.abs(from - new Date()) / 36e5 > 24 * 30) {
        errors.errors.from = 'Cannot book in advance prior than 1 month';
        errors.isValidForm = false;
    }
    else if ((from && to && (Math.abs(from - to) / 36e5) > 24)) {
        errors.errors.to = 'Please select a time between 1 and 24 hours';
        errors.isValidForm = false;
    }
    else if (Math.round((Math.abs(from - to) / 60000) < 30)) {
        errors.errors.to = 'Minimun Booking time should be 30 min';
        errors.isValidForm = false;
    }
    return errors
}

export const isValidAddSlotForm = ({ name, slots }) => {
    const options = [
        { type: TEXT, value: name, key: 'name', max: 40, min: 1 },
        { type: NUMERIC, value: `${slots}`, min: 1, key: 'slots' },
    ]
    return validator(options);
}