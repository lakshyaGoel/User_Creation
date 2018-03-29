let express = require("express");
let router = express.Router();
let ObjectId = require("mongodb").ObjectID;

router.get("/", function(req, res, next) {
  let User = require("../model/user");
  User.find({}, function(err, users) {
    return users;
  }).then(usr => {
    res.send(usr);
  });
});

router.post("/", function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  email = email.toLocaleLowerCase();
  let disName = req.body.disName;
  let User = require("../model/user");
  User.findOne({ email: email }, function(err, usr) {
    if (err) Promise.reject(err.stringify());
    return usr;
  })
    .then(usr => {
      if (!usr) {
        console.log("Inserting new user...");
        let new_user = new User();
        new_user.name = name;
        new_user.email = email;
        new_user.displayName = disName;
        new_user.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            let msg = "Successfully Added " + disName;
            res.send({ msg: msg });
            console.log("Successfully Added");
          }
        });
      } else {
        let msg = disName + " already in database";
        res.send({ msg: msg });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/", function(req, res, next) {});

module.exports = router;
