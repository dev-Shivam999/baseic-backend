var express = require('express');
var router = express.Router();

/* GET users listing. */

const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/first')

// Schema mtlb aapko ye bataan wale har document

const userSchema=mongoose.Schema({
  username:String,
  name:String,
  age:Number
})

module.exports=mongoose.model("user",userSchema )  //make collection 