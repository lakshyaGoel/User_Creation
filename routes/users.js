let express = require("express");
let router = express.Router();
let ObjectId = require("mongodb").ObjectID;
let User = require("../model/user");
router.get("/", function(req, res, next) {
  User.find({}, function(err, users) {
    return users;
  }).then(usr => {
    let users = usr.map(val => {
      return {
        username: val.username,
        displayName: val.displayName,
        department: val.department
      };
    });
    res.send({ users: users });
  });
});

router.get("/:username/", function(req, res, next) {
  let username = req.params.username;
  User.findOne({ username: username }, function(err, usr) {
    if (err) Promise.reject(err.stringify());
    return usr;
  })
    .then(usr => {
      if (usr) {
        res.send({
          displayName: usr.displayName,
          department: usr.department
        });
      } else {
        res.send({
          code: 404,
          msg: username + " Not Found"
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/:username/", function(req, res, next) {
  let username = req.params.username;
  let department = req.body.department;
  let displayName = req.body.displayName;
  User.findOne({ username: username }, function(err, usr) {
    if (err) Promise.reject(err.stringify());
    return usr;
  })
    .then(usr => {
      if (!usr) {
        console.log("Inserting new user...");
        let new_user = new User();
        new_user.username = username;
        new_user.department = department;
        new_user.displayName = displayName;
        new_user.save(function(err) {
          if (err) {
            console.log("ERROR!!!!!!");
            console.log(err);
          } else {
            let msg = "Successfully Added " + username;
            res.send({ msg: msg });
          }
        });
      } else {
        let msg = username + " already in database";
        res.send({ code: 409, msg: msg });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/:userName/", function(req, res, next) {
  let username = req.params.userName;

  User.findOneAndRemove({ username: username }, (err, del) => {
    if (err) Promise.reject(err.stringify());

    return del;
  })
    .then(del => {
      if (del) {
        let msg = username + " successfully deleted!";
        res.send({ msg: msg });
      } else {
        res.send({
          code: 404,
          msg: username + " Not Found"
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
