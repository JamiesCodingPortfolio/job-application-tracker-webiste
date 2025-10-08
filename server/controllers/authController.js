import { generateSalt, hashPassword } from '../utils/passwordHasher.js';

export const signup = async (req, res) => {
    try {
        const { email, password } =  req.body;

        console.log('Recieved email:', email);

        const generatedSalt = generateSalt();
        const hashedPassword = await hashPassword(password, generatedSalt);
        console.log(hashPassword);

        

    } catch (error) {
        
    }
}