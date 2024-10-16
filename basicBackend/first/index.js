import express from 'express';
import path from 'path';
import mongoose from 'mongoose';



mongoose.connect("mongodb://127.0.0.1:27017/bf").then(()=>console.log("ho gaya ")).catch((e)=>console.log(e))

const mas=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
})

const Massage =mongoose.model("Massage",mas)
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(path.resolve(),"public")))

app.use(express.urlencoded({extends:true}))

app.get('/',(req, res, next) => {
    res.render('index')
})


app.get('/api',(req, res, next) => {

})
app.get('/about',(req, res, next) => {
    res.send('Welcome about: ' )
})

app.get('/ans',(req, res, next) => {

res.render('ans')

})
app.post('/', async(req, res, next) => {
   const mas=await Massage.create({
        name:req.body.name,
        email:req.body.email
    }) 


    res.json(mas)
    
})

app.listen(3000)