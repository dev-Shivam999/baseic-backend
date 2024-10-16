import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import mongoose, { Model } from 'mongoose';
dotenv.config();

const app = express();
const port = 3000;
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/img").then(async()=> await console.log("db connection")).catch(async(error)=>{
    await console.log(error);
    
})
interface UserTye{
url: string;
}
type UserType = UserTye & mongoose.Document;


const Url= new mongoose.Schema({
    url:{
        type:String
    }
})

const image: Model<UserType> = mongoose.model<UserType>('image', Url);




const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });



cloudinary.config({
    cloud_name: `dqavwsmjz`,
    api_key: `516368122868384`,
    api_secret:`Lom92IaUx-dZAXOdc3h8Pkk-aFA`
});

// Variable to store the public ID of the previously uploaded file
let previousPublicId:null|string = null;

// Route for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // If there's a previous file, delete it from Cloudinary
        if (previousPublicId) {
            console.log(previousPublicId);
            
            await cloudinary.uploader.destroy(previousPublicId,function(result){console.log(result)});
        }

        // Upload new file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Clean up the temporary file
        fs.unlinkSync(req.file.path);

        // Store the public ID of the newly uploaded file for future deletion
        previousPublicId = result.public_id;
        await image.create({
            url: result.secure_url
        })

        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        res.status(500).json({ message: 'File upload failed' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
