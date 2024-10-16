import { User } from "../model/db.js"

export const geta=async(req,res)=>{
    const user=await User.find({})
    const keyword=req.query.name
    console.log(keyword);
    res.json({
        s:true,
        user
    })
}