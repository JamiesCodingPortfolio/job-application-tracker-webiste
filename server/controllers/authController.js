import { createUser } from "../utils/createUser.js";
import { emailExists } from "../utils/emailExists.js";
import { createSession } from "../utils/createSession.js";

export const signup = async (req, res) => {
    try {
        const { name , email, password } =  req.body;

        console.log('Recieved email:', email);

        const emailCheck = await emailExists(email);

        if (emailCheck === true){
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = await createUser(name, email, password);

        console.log("Created User:", user._id);

        const session = await createSession(user._id);

        res.cookie('session-cookie', session, {
            httpOnly: true,
            secure: process.env.HTTPS_ENABLED === true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 1000,
            path: '/'
        });
        
        return res.status(201).json({ message: "User created successfully", userId: user._id });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}