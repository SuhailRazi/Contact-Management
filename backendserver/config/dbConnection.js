import  { connect } from "mongoose";
import {  config } from "dotenv";

config();
const connectDb = async () =>{
    try{
        const connectdb = await connect(process.env.CONNECTION_STRING);
        console.log("connected", connectdb.connection.host,connectdb.connection.name);
        
    }catch(err){
        console.log(err);
    }
}

export default connectDb