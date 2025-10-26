import mongoose from "mongoose";
import env from "./env";

export const connectDB = async () => {

    try {
        await mongoose.connect(env.database_url as string)
        console.log("✅ database is connected.")
    } catch (error) {
        console.log("❌ database connection error", error)
        process.exit(1)
    }
}