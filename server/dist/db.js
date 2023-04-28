import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const DB_URI = process.env.DB_URI;
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.name}`);
    }
    catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};
