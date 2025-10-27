import { emailExists } from "./emailExists.js";

const isValidString = (str) => 
    typeof str !== 'string' || str.trim() === '';

export const validateInputs = async (fields, options = {}) => {
    const { name, email, password, sessionToken } = fields;
    const {
        checkName = false,
        checkEmail = false,
        checkPassword = false,
        checkExistingEmail = false,
        shouldExist = false,
        checkSessionToken = false,
    } = options;

    if (checkName && isValidString(name)) {
        throw new Error ('Invalid name input');
    }
    if (checkEmail && isValidString(email)) {
        throw new Error ('Invalid email input');
    }
    if (checkPassword && isValidString(password)) {
        throw new Error ('Invalid password');
    }

    const lowercaseEmail = email.toLowerCase().trim();

    if (checkExistingEmail && lowercaseEmail) {
        const exists = await emailExists(lowercaseEmail);
        if (shouldExist && !exists){
            throw new Error ('Email not found');
        }

        if (!shouldExist && exists){
            throw new Error ('Email already registered');
        }
    }

    return {
        name: name?.trim(),
        email: lowercaseEmail,
        password: password?.trim(),
    };
};