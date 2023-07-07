import { Router } from "express";
import { getCurrent, loginUser, registerUser } from "../controller/userController.js";
import validateToken from "../middleware/validateTokenHandle.js";

const userRoutes = Router();

userRoutes.post("/register",registerUser);

userRoutes.post("/login",loginUser);

userRoutes.get("/current",validateToken, getCurrent);


export default userRoutes;