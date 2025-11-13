import Application from "../models/applicationModel.js";
import { validateInputs } from "../utils/validateInputs.js";

export const createApplication = async (name, description, userId) => {
    try {
        //Add validation here

        console.log(`Creating application for userId ${userId}`);

        const newApplication = await Application.create({
            jobName: name,
            jobDesc: description,
            associatedUserId: userId,
        });

        return newApplication;

    } catch (error) {
        console.log("Error creating new application:", error);
        throw error;
    }
}

export const removeApplication = async (name, description, userId) => {
    try {
        //Validation

        console.log(`Deleting existing application associated with userId ${userId}`);

        const existingApplication = await Application.deleteOne({
            jobName: name,
            jobDesc: description,
            associatedUserId: userId,
        });

        return existingApplication;

    } catch (error) {
        console.log("Error deleting existing application:", error);
        throw error;
    }
}