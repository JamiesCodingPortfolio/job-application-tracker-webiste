import { createApplication } from "../services/applicationService.js";
import { sessionExists } from "../utils/sessionExists.js";
import { userExists } from "../utils/userExists.js";

export const addApplication = async (req, res) => {
    try {
        const { name, description } = req.body;
        //console.log(name, description);
        const token = req.cookies['session-cookie'];
        //console.log(token);

        if (!token) return res.status(401).send('Unauthorized');

        const userId = await sessionExists(token);

        await userExists(userId); //To prevent errors if a users account/database entry is deleted

        const application = await createApplication(name, description, userId);

        console.log("Created application:", application._id);
        
        return res.status(201).json({ message: "Application created successfully" });

    } catch (error) {
        console.error("Error creating application:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}