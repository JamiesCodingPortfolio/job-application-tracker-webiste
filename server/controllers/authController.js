import { createUser } from "../services/userService.js"
import { createSession } from "../services/sessionService.js";

export const signup = async (req, res) => {
    try {
        const { name , email, password } =  req.body;

        console.log('Recieved email:', email);

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