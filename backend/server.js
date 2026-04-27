import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config(); // hogy hazsnaljuk
connectDB();
const app = express();
import chats from "./data/data.js";
import userRoutes from "./routes/userRoutes.js"; //adatbazis betöltése
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";app.use(express.json()); // hogy frontend röl küldött json adatoz elfogadja a backend

//api=>
app.get("/", (req,res) => {
    res.send("API is running!");
});

//api end point Frontend → HTTP request → Endpoint → Backend logika → Response
app.use("/api/user",userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(4000,console.log("Server is running on Port 4000"));