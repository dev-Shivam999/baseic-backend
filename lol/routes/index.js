var express = require('express');
var router = express.Router();
const userModel=require("./users")


/* GET home page. */
// router.get('/', function(req, res, next) {
//   req.session.ko="hel"
//   res.render('index');
// });
router.get('/', function(req, res, next) {
  res.cookie("age",123)
  res.render('index');
});
router.get('/del', function(req, res, next) {
  res.clearCookie("age")
  res.send('delete ');
});
// router.get('/next', function(req, res, next) {
//   console.log(req.session)
//   res.send("mil gaya ")
// });
// router.get('/next', function(req, res, next) {
//   req.session.distory( (e)=>console.log("remove"))
//   // res.send("mil gaya ")
// });

router.get('/create',  async function(req, res, next) {
 const cre= await userModel.create({
    username: "lol.html",
    name: "shivam",
    age: 19
  })
  res.send(cre.name)
});

module.exports = router;
