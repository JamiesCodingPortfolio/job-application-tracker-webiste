import { createUser } from "../utils/createUser.js";

export const signup = async (req, res) => {
    try {
        const { name , email, password } =  req.body;

        console.log('Recieved email:', email);

        const user = createUser(name, email, password);

        console.log(user);
        
    } catch (error) {
        console.log("Error creating user:", error);
    }
}