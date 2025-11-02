import Session from "../models/sessionModel.js"
import { hashTokens } from "./hashToken.js";

export const sessionExists = async (sessionToken) => {
    try {
        console.log (`Running session check for session ${sessionToken}`);
        const tokenHash = hashTokens(sessionToken);
        const result = await Session.findOne({ tokenHash });

        return result.userId;
    } catch (error) {
        console.error("Error checking session token:", error.message);
        throw new Error("Error whilst checking session token");
    }  
}