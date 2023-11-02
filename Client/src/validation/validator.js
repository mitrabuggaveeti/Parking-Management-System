import { isAlphanumeric, isLength, isEmail, isNumeric } from 'validator';
export const [TEXT, NUMERIC, EMAIL, PASSWORD, ALPHA_NUMERIC] = ['TEXT', 'NUMERIC', 'EMAIL', 'PASSWORD', 'ALPHA_NUMERIC'];

export default (options) => {
    const errors = {
    }
    for (let option of options) {
        const { min = 0, max = 1000000, type, value = '', key, message } = option;
        if (min && !value.trim()) {
            errors[key] = message || `Please fill your ${key}`;
            continue;
        }
        if (!isLength(value, { max, min }) && ![NUMERIC, EMAIL].includes(type)) {
            errors[key] = message || `${key} should be between ${min} and ${max} length`;
            continue;
        }
        switch (type) {
            case ALPHA_NUMERIC:
                if (!isAlphanumeric(value)) {
                    errors[key] = message || `Please enter a valid ${key}`;
                }
                break;
            case NUMERIC:
                if (!isNumeric(value)) {
                    errors[key] = message || `Please enter a valid ${key}`;
                }
                break;
            case EMAIL:
                if (!isEmail(value)) {
                    errors[key] = message || `Please enter a valid ${key}`;
                }
                break;
            case PASSWORD:
                if (!isLength(value, { min: 6, max: 20 })) {
                    errors[key] = message || `${key} should be between ${min} and ${max} length`;
                    break;
                }
                if (!isAlphanumeric(value)) {
                    errors[key] = message || `${key} should contain only alpha numeric characters`;
                }
                break;
            default:
                break;
        }
    }
    return {
        errors,
        isValidForm: Object.keys(errors).length === 0
    }
}