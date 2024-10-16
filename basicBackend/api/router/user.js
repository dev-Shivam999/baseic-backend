import express from 'express';
import { User } from '../model/db.js';
import { geta } from '../controllers/user.js';

const router =express.Router();

router.get('/', (req, res) => {
    res.send('Welcome')
})
router.get('/', geta)


router.get('/new', async (req, res) => {
    
    await User.create({
        name: name,
        email: email,
        password: password
    })
    // const users=await User.find({})
    res.status(201).cookie("p", "p").json({
        name: "lol",

        massage: "register successfully",

    })
})


router.get("/:id", async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id)
    res.json({
        su: true,
        user
    })
})


export default router