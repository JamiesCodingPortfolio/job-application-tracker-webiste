import User from "../models/userModel.js";
import { validateMongooseInputs } from "./validateMongooseInputs.js";

export const userExists = async (userId) => {
    console.log(`Running User check for userId ${userId}`)
    try {
        
        await validateMongooseInputs(
            { objectId: userId },
            { checkUserId: true }
        );

        const user = await User.findOne({ _id: userId });

        return !!user;
    } catch (error) {
        console.log("Error checking user ID:", error.message);
        throw new Error("Error whilst checking user ID");
    }
}
