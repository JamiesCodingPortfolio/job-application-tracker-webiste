import mongoose from "mongoose";

export const connectDB = async () => {
    console.log("Connecting to database");
    try {
        await mongoose.connect(process.env.DB_KEY, {});
        console.log("Database Conected");
        console.log(`Collections: ${(await mongoose.connection.db.listCollections().toArray()).map(c => c.name)}`);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};