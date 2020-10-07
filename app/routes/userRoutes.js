const express = require("express");
const router = express.Router();
const User = require("../models/User");


/**
 * @route   POST /users/save
 * @desc    Save user
 * @access  Private
 */

router.post("/save", (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  user
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
  res.status(200);
});

/**
 * @route   GET /users/get-all
 * @desc    Retrieve all users
 * @access  Private
 */

router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users exist");
    console.log(users)
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });


  }
});

/**
 * @route   POST /users/get-one
 * @desc    Retrieve user
 * @access  Private
 */

router.post("/get-one", (req, res) => {
  User.findOne({ _id: req.body.id })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200);
});

/**
 * @route   PUT /users/update/:id
 * @desc    Update user
 * @access  Private
 */

router.put("/update/:id", (req, res) => {
  User.updateOne(
    {
      _id: req.params.id,
    },
    req.body,
    { upsert: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200);
});



/**
 * @route   GET /users/get-all-admins
 * @desc    Retrieve all admin users
 * @access  Private
 */

router.get("/get-all-admins", async (req, res) => {
  try {
    const users = await User.find({ role: "admin" });
    if (!users) throw Error("No users exist");
    console.log(users)
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });


  }
});

/**
 * @route   GET /users/get-all-gardners
 * @desc    Retrieve all gardners
 * @access  Private
 */

router.get("/get-all-gardners", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    if (!users) throw Error("No users exist");
    console.log(users)
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });


  }
});

module.exports = router;
