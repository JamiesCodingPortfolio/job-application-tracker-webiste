import { User } from '../models/userModel.js'

export const emailExists = async (email) => {
    console.log (`Running email check for email ${email}`);
    try {
        if (typeof email !== 'string' || email.trim() === ''){
            throw new Error('Invalid email input');
        }

        const lowercaseEmail = email.toLowerCase().trim();

        const user = await User.findone({ lowercaseEmail });
        return !!user;
        
    } catch (error) {
        console.error("Error checking email addresss:", error.message)
        throw new Error("Error whilst checking email")
    }
}