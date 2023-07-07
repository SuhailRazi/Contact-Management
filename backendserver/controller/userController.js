import expressAsyncHandler, {} from 'express-async-handler';
import User from "../models/userModel.js";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'

config()
const { sign } = jwt;
//@desc register user
//@route POST /api/users/register
//@access public

export const registerUser =expressAsyncHandler( async (req,res) =>{
    const {username , email ,password }= req.body;
    if(!username || !email || !password){
        res.status(400).json("Mandatory fields are not entered");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exist");
    }


    // Hash password
    const hashPassword = await  hash(password,10);
    console.log("hash password : ",hashPassword);
    const newUser = await User.create({
        username,
        email,
        password : hashPassword
    });

    console.log(`User Created ${newUser}`);
    if(newUser){
        res.status(201).json({_id : newUser.id , email : newUser.email})
    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
    res.json({message : "Registerd"});
})

//@desc Login user
//@route  POST api/users/login
//@access public
export const  loginUser =expressAsyncHandler(async (req,res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill both email and password")
    }

    const validUser = await User.findOne({email});
    if(!validUser){
        res.status(400).json("EMail not found");
        throw new Error("Email id not found");
    }

    // comapre password with hashed password
    if(validUser && (await compare(password , validUser.password))){
        const accesToken = sign({
            user:{
                username : validUser.username,
                email : validUser.email,
                id : validUser.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1m"}
        );
        res.status(200).json({accesToken})
    }else{
        res.status(401);
        throw new Error("email or password not valid");
    }
    res.json({message : "Login succesfull"});
})

//@desc get Current user detail
//@route  GET api/users/current
//@access private
export const getCurrent =expressAsyncHandler(async (req,res) =>{
    res.json(req.user);
})

