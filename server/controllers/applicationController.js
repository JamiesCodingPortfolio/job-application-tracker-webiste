import { changeApplication, createApplication, listApplications, removeApplication } from "../services/applicationService.js";
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

        await userExists(userId); //To prevent errors if a users account/database entry is deleted whilst a user is logged on

        const application = await createApplication(name, description, userId);

        console.log("Created application:", application._id);
        
        return res.status(201).json({ message: "Application created successfully" });

    } catch (error) {
        console.error("Error creating application:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const deleteApplication = async (req, res) => {
    try {
        const { name, description } = req.body;

        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorised');

        const userId = await sessionExists(token);

        await userExists(userId);

        const application = await removeApplication(name, description, userId);

        console.log("Deleted application", name);

        return res.status(201).json({ message: "Application deleted successfully" });

    } catch (error) {
        console.error("Error deleting application:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const modifyApplication = async (req, res) => {
    try {
        const { name, modifyProperty, newProperty } = req.body;

        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorised');

        const userId = await sessionExists(token);

        await userExists(userId);

        const application = await changeApplication(name, userId, modifyProperty, newProperty,);

        console.log("Modified application", application._id);

        return res.status(201).json({ message: "Application modified successfully" });

    } catch (error) {
        console.error("Error modifiying application:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const getApplications = async (req, res) => {
    try {
        const token = req.cookies['session-cookie'];

        if (!token) return res.status(401).send('Unauthorised');

        const userId = await sessionExists(token);

        await userExists(userId);

        const applications = await listApplications(userId);

        console.log(applications);

        console.log("Data sent for userId", userId);

        return res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}