import Application from "../models/applicationModel.js";
import { validateInputs } from "../utils/validateInputs.js";

export const createApplication = async (name, description, userId) => {
    try {
        //Add validation here

        console.log(`Creating application for userId ${userId}`);

        const newApplication = await Application.create({
            jobName: name,
            jobDesc: description,
            state: "Applied",
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

export const changeApplication = async (name, userId, propertyModified, newProperty) => {
    try {
        //Validation

        console.log(`Modifying application associated with userId ${userId}`);

        let updateField = {};
        if (propertyModified === 'description') {
            updateField = { jobDesc: newProperty };
        } else if (propertyModified === 'state') {
            updateField = { state: newProperty };
        } else {
            throw new Error (`Unsupported property type: ${propertyModified}`);
        }

        const modifiedApplication = await Application.findOneAndUpdate(
            { jobName: name, associatedUserId: userId },
            { $set: updateField },
            { new: true }
        );

        if (!modifiedApplication) {
            throw new Error ("Application not found");
        }

        return modifiedApplication;
        
    } catch (error) {
        console.log("Error modifying existing application:", error);
        throw error;
    }
}