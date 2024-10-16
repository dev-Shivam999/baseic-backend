import mongoose from "mongoose";

const todoSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

export const Schema =mongoose.model("Schema",todoSchema)