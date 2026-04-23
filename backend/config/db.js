import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await  mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit();
    }
}
export default connectDB; //connectDB pedig a server.js-be meg kell hivni