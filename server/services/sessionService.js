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