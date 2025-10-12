import Session from "../models/sessionModel.js";
import { createUserSession } from "./session.js";
import { hashTokens } from "./hashToken.js";

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
    }
}