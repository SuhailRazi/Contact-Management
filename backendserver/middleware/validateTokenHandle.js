import expressAsyncHandler from "express-async-handler";
import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config()


const validateToken = expressAsyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorized");
            }
            req.user = decoded.user;
            next();
        });

    if(!token){
        res.status(401);
        throw new Error("User is not authorised/token is missing");
    }
    }
});

export default validateToken;