import express from 'express';
import mongoose from 'mongoose';
import router from './router/user.js';
const app = express();
app.use("/user",router)





app.listen(3000)