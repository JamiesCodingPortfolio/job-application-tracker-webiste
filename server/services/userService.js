import User from "../models/userModel.js"
import { generateSalt, hashPassword } from "../utils/passwordHasher.js"
import { emailExists } from "../utils/emailExists.js"
import { validateInputs } from "../utils/validateInputs.js"
import { validatePassword } from "../utils/validatePassword.js"

export const createUser = async (name, email, password) => {
    try {
        const validation = await validateInputs(
            { name, email, password },
            { checkName: true, checkEmail: true, checkPassword: true, checkExistingEmail: true, shouldExist: false }
        );

        const { name: cleanName, email: cleanEmail, password: cleanPassword } = validation;

        console.log(`Creating account for ${cleanEmail}`)

        const salt = generateSalt();
        const hashedPassword = await hashPassword(cleanPassword, salt);

        const newUser = await User.create({
            name: cleanName,
            email: cleanEmail,
            hashedPassword,
            salt
        });

        return newUser;

    } catch (error) {
        console.log("Error adding new user:", error);
    }
}

export const userLogin = async (email, password) => {
    try {
        const validation = await validateInputs(
            { email, password },
            { checkEmail: true, checkPassword: true, checkExistingEmail: true, shouldExist: true }
        );

        const { email: cleanEmail, password: cleanPassword } = validation;

        console.log(`Attempting to log in user with email ${cleanEmail}`);

        const user = await User.findOne({ email: cleanEmail });

        const newHash = await hashPassword(
            cleanPassword,
            user.salt
        );

        if (validatePassword(newHash, user.hashedPassword)){
            return user._id;
        }
        else {
            throw new Error ('Email or password is incorrect');
        }

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}