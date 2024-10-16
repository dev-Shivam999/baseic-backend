import express, { Request, Response } from 'express';
import { lo, token, validation } from '../utils/utils';
import { Picture, U, User, su } from '../models/models';
import multer from 'multer'
import path from "path"
import {v2 as cloudinary}  from 'cloudinary'

export const route = express.Router();

route.get("/data", validation, async (req: Request, res: Response) => {
    try {
        const token: token | undefined = await req.cookies.token
        const data = await User.findOne({ _id: token });
        const pic:su|null = await Picture.findOne({ userId: token });
   
        res.json({ success: true, data:  data,pic: pic?.pic ,message:"success"});
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Error fetching user data" });
    }
});

route.post("/sign", async (req: Request, res: Response) => {
    const re: undefined | null | { re: U } = req.body;

    try {
        const existingUser = await User.findOne({ email: re?.re.email });
        // console.log(existingUser);

        if (existingUser !== null) {
            // console.log("lm");
            return res.json({ success: false, message: "User already exists" });
        } else {
            // console.log("l");
            const numberOf = await User.findOne({ number: re?.re.number });
            if (numberOf !== null) {
                return res.json({ success: false, message: "User number already exists" });

            } else {
                const data = await User.create({
                    name: re?.re.name,
                    email: re?.re.email,
                    number: re?.re.number,
                    password: re?.re.password
                });

                res.cookie('token', data._id, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 100000),
                    sameSite: 'none', // This allows the cookie to be included in cross-origin requests
                    secure: true, // This ensures that the cookie is only sent over HTTPS
                }).json({ success: true, message: "user created successfully" });
            }

        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Error creating user" });
    }
});


route.post('/log', async (req: Request, res: Response) => {
    const { re }: { re: lo } = req.body

    try {
        const existingUser = await User.findOne({ email: re.email });
        // console.log(existingUser);

        if (existingUser == null) {
            // console.log("lm");
            return res.json({ success: false, message: "User not found" });
        } else {
            // console.log("l");


            if (existingUser.password == re.password) {

                res.cookie('token', existingUser._id, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 100000),
                    sameSite: 'none', // This allows the cookie to be included in cross-origin requests
                    secure: true, // This ensures that the cookie is only sent over HTTPS
                }). json({ success: true, message: "user Login successfully" });
            } else {
                return res.json({ success: false, message: "wrong password" });

            }


        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Error creating user" });
    }
})


const fs = require('fs');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname );
    }
});
const upload = multer({ storage: storage });




cloudinary.config({
    cloud_name: `dqavwsmjz`,
    api_key: `516368122868384`,
    api_secret: `Lom92IaUx-dZAXOdc3h8Pkk-aFA`
});

let previousPublicId: null | string = null;

route.post('/pic', upload.single('file'), async (req:Request, res:Response) => {
    try {
        const token: token | undefined = await req.cookies.token
        // console.log(token);
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Ensure token is present and valid
        if (!token) {
            return res.status(400).json({ success: false, message: 'User token not provided' });
        }

        // Create a new Picture document with userId and pic fields populated
        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
const LOL:su|null=await Picture.findOne({userId:token})

        if (LOL) {
            const lp=await cloudinary.uploader.destroy(LOL.picId);
            
            await Picture.findByIdAndUpdate({ _id: LOL._id }, { $set :{ pic :result.secure_url  }})
            return res.status(200).json({ message: result.secure_url, success: true });
            
        }else{
            const p: su = await Picture.create({
                userId: token,
                pic: result.secure_url ,
                picId:result.public_id// Assuming result.secure_url contains the URL of the uploaded image
            });
            res.status(200).json({ message: p.pic, success: true });
        }
        

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        res.status(500).json({ success: false, message: 'File upload failed' });
    }
});

route.get("/remove",async(req:Request, res:Response) => {
    const token: token | undefined = await req.cookies.token
    const LOL: su | null = await Picture.findOne({ userId: token })
    if (LOL) {
        // const lp = await cloudinary.uploader.destroy(result.public_id, function (result) { console.log(result) });
        await Picture.findByIdAndUpdate({ _id: LOL._id }, { $set: { pic: "" } })
        return res.json({success: true})

    }else{
        return res.json({ success: false })  
    }
})
