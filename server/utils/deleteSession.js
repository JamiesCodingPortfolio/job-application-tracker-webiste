import Session from "../models/sessionModel.js"
import { hashTokens } from "./hashToken.js";

export const deleteSession = async (sessionToken) => {
    try {
        const tokenHash = hashTokens(sessionToken);
        const result = await Session.findOne({ tokenHash });

        console.log (`Running session check for User ID ${result.userId}`);

        const newResult = await Session.deleteOne({ tokenHash });

        return newResult;
    } catch (error) {
        console.error("Error deleting session token:", error.message);
        throw new Error("Error whilst deleting session token");
    }  
}