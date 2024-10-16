import express, { Request, Response } from 'express'
import { Db } from './db/db'
import { route } from './routes/User'
import cors from 'cors'
import cookieParser from 'cookie-parser';

Db()
const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))
app.use(cookieParser());
app.use(express.json())

app.use("/user", route)

app.listen(3000, () => {
    console.log("app listening on port");

})


