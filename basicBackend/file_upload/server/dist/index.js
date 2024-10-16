"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
mongoose_1.default.connect("mongodb://127.0.0.1:27017/img").then(async () => await console.log("db connection")).catch(async (error) => {
    await console.log(error);
});
const Url = new mongoose_1.default.Schema({
    url: {
        type: String
    }
});
const image = mongoose_1.default.model('image', Url);
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
cloudinary_1.v2.config({
    cloud_name: `dqavwsmjz`,
    api_key: `516368122868384`,
    api_secret: `Lom92IaUx-dZAXOdc3h8Pkk-aFA`
});
// Variable to store the public ID of the previously uploaded file
let previousPublicId = null;
// Route for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // If there's a previous file, delete it from Cloudinary
        if (previousPublicId) {
            console.log(previousPublicId);
            await cloudinary_1.v2.uploader.destroy(previousPublicId, function (result) { console.log(result); });
        }
        // Upload new file to Cloudinary
        const result = await cloudinary_1.v2.uploader.upload(req.file.path);
        // Clean up the temporary file
        fs_1.default.unlinkSync(req.file.path);
        // Store the public ID of the newly uploaded file for future deletion
        previousPublicId = result.public_id;
        await image.create({
            url: result.secure_url
        });
        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id
        });
    }
    catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        res.status(500).json({ message: 'File upload failed' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
