import User from "../models/userModel";

export const userExists = async (userId) => {
    console.log(`Running User check for userId ${userId}`)
    try {
        //if (typeof userId !== mongoose.)
        const user = await User.findOne({ _id: userId });

        return !!user;
    } catch (error) {
        console.log("Error checking user ID:", error.message);
        throw new Error("Error whilst checking user ID");
    }
}
