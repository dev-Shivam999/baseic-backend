import { NextFunction, Request, Response } from "express";
import { U, User, us } from "../models/models";
export interface token{
    token: string;
}
interface to{
    token:token|undefined
}
export interface lo{
    email:string,
    password:string
}
export const validation=async(req:Request,res:Response,next:NextFunction)=>{

    const token:to=await req.cookies.token
    
const response:U|null=await User.findById(token)

if (response==null) {
    

    res.json({success:false,message:"login first"})
}else{
    next()
}

}