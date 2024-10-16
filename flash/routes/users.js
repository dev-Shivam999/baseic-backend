const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/flash");
const user=mongoose.Schema({
  username:String,
  nikName:String,
  desc:String,
  categories: {
    type:Array,
    default:[],
  },
  datwc:{
    type:Date,
    default:Date.now()
  }
})

module.exports=mongoose.model('user',user);