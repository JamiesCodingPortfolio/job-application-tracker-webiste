import User from "../models/userModel"
import { generateSalt, hashPassword } from "./passwordHasher"

export const createUser = async (name, email, password) => {
    try {
        console.log(`Creating account for ${email}`)
        if (typeof email !== 'string' || email.trim() === ''){
            throw new Error('Invalid email input');
        }

        if (typeof name !== 'string' || name.trim() === ''){
            throw new Error ('Invalid name input');
        }

        if (typeof password !== 'stirng' || password.trim() === ''){
            throw new Error ('Invalid password')
        }

        const lowercaseEmail = email.toLowerCase().trim();

        const salt = generateSalt();

        const hashedPassword = hashPassword(password, salt);

        const newUser = await User.create({
            name,
            email,
            hashedPassword,
            salt
        });

        return !!newUser;

    } catch (error) {
        
    }
}