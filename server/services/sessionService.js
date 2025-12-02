import Session from "../models/sessionModel.js";
import { createUserSession } from "../utils/session.js";
import { hashTokens } from "../utils/hashToken.js";

export const createSession = async (userId) => {
    try {
        const userSession = createUserSession();
        const tokenHash = hashTokens(userSession);

        await Session.create({
            userId: userId,
            tokenHash: tokenHash
        });

        return userSession;
    } catch (error) {
        console.log("Error creating new session:", error);
        throw error;
    }
}

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