import mongoose, { Model } from "mongoose";

export interface U{
    name:string;
    email:string;
    number:string;
    password:string;
}
export interface P{
    pic:string;
    picId:string;
}
export type su=mongoose.Document & P
export type us=mongoose.Document & U

const UserSchema =new  mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    number:{type:String, required:true,unique:true},
    email:{type:String, required:true,unique:true},
password:{type:String, required:true}
})
const Pict=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    pic: {
        type: String,
        required: true
    },
    picId: {
        type: String,
        required: true
    },

})

export const User:Model<us>= mongoose.model<us>('User',UserSchema)

export const Picture:Model<su>= mongoose.model<su>('Picture',Pict)