import { Router } from "express";
import { getCurrent, loginUser, registerUser } from "../controller/userController.js";

const userRoutes = Router();

userRoutes.post("/register",registerUser);

userRoutes.post("/login",loginUser);

userRoutes.get("/current",getCurrent);


export default userRoutes;