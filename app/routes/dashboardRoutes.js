const express = require("express")
const router = express.Router()
const Chat = require("../models/chatModel")
const User = require("../models/User")
const Units = require("../models/unitModel")
const Plant = require("../models/plantTips.model.js");
const { ObjectId } = require('mongodb');
const { find } = require("../models/chatModel")


/**
 * @route   GET /dashboard/get-total-users
 * @desc    Retrieve total active user count
 * @access  Private
 */

router.get("/get-total-users", async (req, res) => {
  try {
    const users = await User.find({deleted:{$ne: true} }).count()
    if (!users) throw Error("No users exist")
    res.json({result:users, status: 200});
  } catch (e) {
    res.status(400).json({ msg: e.message, status: 400 })
  }
});


/**
 * @route   GET /dashboard/get-total-units
 * @desc    Retrieve total units count
 * @access  Private
 */

router.get("/get-total-units", async (req, res) => {
    try {
      const units = await Units.find().count()
      if (!units) throw Error("No units exist")
      res.json({result:units, status: 200});
    } catch (e) {
      res.status(400).json({ msg: e.message, status: 400 })
    }
  });


/**
 * @route   GET /dashboard/get-total-vulnerable-units
 * @desc    Retrieve total vulnerable units count
 * @access  Private
 */

router.get("/get-total-vulnerable-units", async (req, res) => {
    try {
      const units = await Units.find({vulnerable:{$eq: true} }).count()
      if (!units) throw Error("No vulnerable units exist")
      res.json({result:units, status: 200});
    } catch (e) {
      res.status(400).json({ msg: e.message, status: 400 })
    }
  });


/**
 * @route   GET /chats/get-total-unread-chats
 * @desc    Retrieve unread chats count
 * @access  Private
 */

router.get("/get-total-unread-chats", async (req, res) => {
  try {
    const chats = await Chat.find({ $and:[{newFromUser: true}, {deleted:{$ne: true} }]}).count();
    if (!chats) throw Error("No unread chats exist")
    res.json({result:chats, status: 200})
  } catch (e) {
    res.status(400).json({ msg: e.message, status: 400 })
  }
});



/**
 * @route POST /dashboard/district-unit-count
 * @desc Get unit count
 * @access Private
 */

router.post("/district-unit-count", async (req, res) => {
  Units.find({ "location": req.body.location }).count()
  .then((result) => {
    res.json(result);
    res.status(200)
  })
  .catch((err) => {
    console.log(err);
    res.status(400)
  });
})



/**
 * @route GET /dashboard/get-plant-count
 * @desc Get plant count
 * @access Private
 */

router.get("/get-plant-count", async (req, res) => {
  Plant.find().count()
  .then((result) => {
    res.json({result:result, status: 200});
  })
  .catch((err) => {
    res.status(400).json({ msg: e.message, status: 400 })
  });
})


module.exports = router