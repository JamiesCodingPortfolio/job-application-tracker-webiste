import { sessionExists } from "../utils/sessionExists.js";
import { userExists } from "../utils/userExists.js";

export const addApplication = async (req, res) => {
    try {
        const { name, description } = req.body;
        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorized');

        const userId = await sessionExists(token);

        await userExists(userId); //To prevent errors if a users account/database entry is deleted



    } catch (error) {
        console.error("Error creating application:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}