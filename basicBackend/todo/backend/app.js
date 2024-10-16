import express from 'express';

import cors from 'cors'
import { router } from './router/user.js';

export const app = express();
app.use(express.json());
app.use(cors())


app.use("/todo",router)


app.get('/', (req, res) => {
    res.send("welcome")
})
