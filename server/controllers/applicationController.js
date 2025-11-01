import { sessionExists } from "../utils/sessionExists";

export const addApplication = async (req, res) => {
    try {
        const { name, description } = req.body;
        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorized');

        const userId = await sessionExists(token);

    } catch (error) {
        console.error("Error creating application:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}