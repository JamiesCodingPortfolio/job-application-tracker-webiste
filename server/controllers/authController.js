import { createUser, userLogin } from "../services/userService.js"
import { createSession } from "../services/sessionService.js";
import { deleteSession } from "../utils/deleteSession.js";

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
        
        return res.status(201).json({ message: "Account created successfully"});

    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Recieved email for login:", email);

        const user = await userLogin (email, password);
        
        console.log("Logged in user:", user.email);

        const session = await createSession(user._id);

        res.cookie('session-cookie', session, {
            httpOnly: true,
            secure: process.env.HTTPS_ENABLED === true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 1000,
            path: '/'
        });

        return res.status(201).json({ message: "Logged in successfully"});
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorised');

        const result = await deleteSession(token);

        console.log(result);

        res.clearCookie('session-cookie');
        return res.status(200).json({ message: "Logged out successfully"});
    } catch (error) {
        console.log("Error logging out:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}