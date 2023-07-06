import { Schema, model } from "mongoose";

const userSchema = Schema({
    username:{
        type : String,
        required : [true , "Please enter the username."]
    },
    email : {
        type : String,
        required : [true,"Please enter the email ID"],
        unique : [true, "Email address already exist"]
    },
    password : {
        type : String,
        required : [true , "ENter the pasword"]
    }
},{
    timestamps : true
})

export default model("User",userSchema);