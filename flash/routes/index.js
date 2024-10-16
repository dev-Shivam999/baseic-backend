var express = require('express');
var router = express.Router();
const user = require('./users')

const localStrategy = require('passport-local').Strategy;

const passport = require('passport');
passport.use(new localStrategy(user.authentication()))

router.get('/', function (req, res, next) {
  res.render('index');
});


// router.get('/lol', function(req, res, next) {
//   req.flash("lk",121)
//   res.render('index')
// });
// router.get('/lola', function(req, res, next) {
//   res.send(req.flash("lk"))
// });








router.get('/create', async function (req, res) {
  const userData = await user.create({
    username: "teri",
    nikName: " to ",
    desc: "teri to me dek",
    categories: ['kay', 'kya', 'karat hu'],

  })
  res.send(userData)

})
router.get('/find', async function (req, res) {
  //  var re= new RegExp("^lOl$","i")
  //   let one =await user.find({categories:{$all:["node"]}})
  //   res.send(one)

  // var date1=new Date('2024-02-02')
  // var date2=new Date('2024-05-03')
  //   let one = await user.find({ datwc: { $gte:date1,$lte:date2 } })

  //   res.send(one)


  // let one = await user.find({ categories: { $exists: true } })
  //   res.send(one)

  //   let one = await user.find({
  //     nickname: { $exists: true }, // Ensure the 'nickname' field exists
  //     $expr: {
  //       $and: [
  //         { $gte: [{ $strLenCP: "$nickname" }, 0] },
  //         { $lte: [{ $strLenCP: "$nickname" }, 12] }
  //       ]
  //     }
  //   });

  // res.send(one)


})



router.get('/resi', function (req, res) {

  var userData = new user({ username: String, secret: String })
  user.register(userData, req.body.password).then((registereduser) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect('/pro')
    })
  })
})
router.get('/pro', (req, res) => {
  res.send('lollkmn')
})
router.get('/login', passport.authenticate("local", {
  successRedirect: "/pro",
  failureRedirect: '/'
}), function (req, res) { })


router.get('/logout', function (req, res, next) {
  req.logOut((er) => {
    if (er) {
      return next(er)
    }
    res.redirect('/')
  })
})

function isLoggedIn(req, res, next) {
  if (req.authenticate()) {
    return next()
    
  }
  res.redirect('/')
}

module.exports = router;
