import { Schema, model } from "mongoose";

const contactSchema = Schema({
    name: {
        type : String,
        required : [true ,"Please fill your name"],
    },
    email :{
        type : String,
        required : [true ,"Please enter your emailId"],
    },
    phone : {
        type : String,
        required : [true , "please add the contact Phone number"]
    }
},{
    timestamps : true,
});

 

export default model("Contact",contactSchema)