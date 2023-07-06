import express, { json } from "express";
import { config } from "dotenv";
import router from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";


config()
connectDb();
const app = express();


app.use(express.json())
app.use("/api/contacts",router);
app.use("/api/users",userRoutes);
app.use(errorHandler)

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Working in server ${port}`);
})