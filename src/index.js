import mongoose from "mongoose";
import { DB_NAME } from "./constants";

;(async()=>{
    try {
    await  mongoose.connect(`${process.env.MANGODB_URI}/{DB_NAME}`)
    } catch (error) {
        console.error("ERROR:",error)
        throw error
    }
})()