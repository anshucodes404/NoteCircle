import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectioInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB host: ", connectioInstance.connection.host)
    } catch (error: any) {
        console.error("MongoDB connection error: ", error)
        process.exit(1)
    }
}

connectDB();