const express = require('express');
const app = express();


app.set("view engine", "ejs")
app.use(express.static('./public'))

app.get('/', function(req, res){
    res.render("index",{lol:20});
})
app.get('/error', function(req, res){
  
    throw Error ("some thing wrong")
})


app.use(function (err,req, res, next){
    if(err.headersSend) return next(err)
    res.status(500)
res.render("error",{error:err})
})

app.listen(5500);